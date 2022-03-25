
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { FormControl } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FilmDetailsService } from '../../../core/services/film-details.service';
import { FilmDetails } from '../../../core/models/film-details';
import { isFilm } from '../../../core/guards/film.guard';
import { Film } from '../../../core/models/film';

/**
 * Route params of detail page.
 */
interface EditPageParams {

  /** Film id.*/
  readonly id: string;
}

/**
 * Updated by user details to update film.
 */
export interface UpdatedDetails {

  /** Text in the beginning of the film.*/
  readonly openingCrawl: string;

  /** Ids of species.*/
  readonly species: readonly string [];

  /** Ids of starships.*/
  readonly starships: readonly string[];

  /** Ids of characters.*/
  readonly characters: readonly string[];

  /** Ids of planets.*/
  readonly planets: readonly string[];

  /** Title of film.*/
  readonly title: string;

  /** Director or directors separated by ','.*/
  readonly director: string;

  /** Producer or producers separated by ','.*/
  readonly producer: string;

  /** Date of film creation.*/
  readonly createdDate: Date;

  /** Date when film was released.*/
  readonly releaseDate: Date;
}

/**
 * Edit film page.
 */
@UntilDestroy()
@Component({
  selector: 'sw-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFilmComponent implements OnInit, AfterViewInit {

  public constructor(
    private readonly filmDetailsService: FilmDetailsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    this.maxDate = new Date();

    this.allDetails$ = this.filmDetailsService.getAllDetails().pipe(
      first(),
      untilDestroyed(this),
      shareReplay(),
    );

    this.filmDetails$ = this.filmId$.asObservable().pipe(
      switchMap(id => this.filmDetailsService.getFilmDetails(id, false)),
      filter(film => isFilm(film)),
      shareReplay(),
    );

    this.isLoading$ = combineLatest(
      this.allDetails$.pipe(
        map(data => !!data),
        startWith(false),
      ),
      this.isLoadedFilm$,
    ).pipe(
      map(action => action.some(element => element === false)),
    );
  }

  /** Max date value for date-pickers.*/
  public readonly maxDate: Date;

  /** Film id.*/
  public readonly filmId$ = new BehaviorSubject<string>('');

  /** Loading status.*/
  public readonly isLoading$: Observable<boolean>;

  /** Loading film status.*/
  public readonly isLoadedFilm$ = new BehaviorSubject<boolean>(false);

  /** Loading details status.*/
  public readonly isLoadingDetail$ = new BehaviorSubject<boolean>(true);

  /** Title field input.*/
  public readonly titleInput = new FormControl('');

  /** Director field input.*/
  public readonly directorInput = new FormControl('');

  /** Producer field input.*/
  public readonly producerInput = new FormControl('');

  /** Created date input element.*/
  public readonly createdDatePicker = new FormControl('');

  /** Released date input element.*/
  public readonly releasedDatePicker = new FormControl('');

  /** All characters input element. */
  public readonly charactersMultiSelect = new FormControl('');

  /** All characters input element. */
  public readonly planetsMultiSelect = new FormControl('');

  /** All characters input element. */
  public readonly speciesMultiSelect = new FormControl('');

  /** All starships select.*/
  public readonly starShipMultiSelect = new FormControl('');

  /** Edited film opening crawl. */
  public readonly openingCrawlInput = new FormControl('');

  /** Stream of edited film details.*/
  public readonly filmDetails$: Observable<Film>;

  /** Stream of all film details.*/
  public readonly allDetails$: Observable<FilmDetails>;

  /**
   * Update film details.
   */
  public updateFilm(): void {
    const details =
      {
        species: this.speciesMultiSelect.value,
        starships: this.starShipMultiSelect.value,
        planets: this.planetsMultiSelect.value,
        characters: this.charactersMultiSelect.value,
        title: this.titleInput.value,
        openingCrawl: this.openingCrawlInput.value,
        director: this.directorInput.value,
        producer: this.producerInput.value,
        createdDate: new Date(this.createdDatePicker.value),
        releaseDate: new Date(this.releasedDatePicker.value),

      } as UpdatedDetails;
    this.filmDetailsService.updateDetails(this.filmId$.getValue(), details)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => this.showMessageEditSnackBar('Edited Failed'),
      });
  }

  /**
   * Delete film from firestore.
   */
  public deleteFilm(): void {
    this.filmDetailsService.deleteFilm(this.filmId$.getValue())
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => this.showMessageEditSnackBar('remove Failed'),
      });
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.route.queryParams.pipe(
      untilDestroyed(this),
      map(params => (params as EditPageParams).id),
    ).subscribe({
      next: id => {
        this.filmId$.next(id);
      },
    });
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {

    this.filmDetails$
      .subscribe(filmDetails => {
        this.titleInput.setValue(filmDetails.title);
        this.directorInput.setValue(filmDetails.director);
        this.producerInput.setValue(filmDetails.producer.join(', '));
        this.createdDatePicker.setValue(filmDetails.created);
        this.releasedDatePicker.setValue(filmDetails.releaseDate);
        this.openingCrawlInput.setValue(filmDetails.openingCrawl);
        this.charactersMultiSelect.setValue(filmDetails.charactersIds);
        this.planetsMultiSelect.setValue(filmDetails.planetsIds);
        this.starShipMultiSelect.setValue(filmDetails.starshipsIds);
        this.speciesMultiSelect.setValue(filmDetails.speciesIds);
        this.isLoadedFilm$.next(true);
      });
  }

  /**
   * If get firestore error, show error snackbar.
   * @param message Message to show on snackbar.
   */
  private showMessageEditSnackBar(message: string): void {
    const horizontalPosition = 'right';
    const verticalPosition = 'bottom';
    const duration = 4000;
    const closeTitle = 'Close';

    this.snackBar.open(message, closeTitle, {
      horizontalPosition,
      verticalPosition,
      duration,
    });
  }
}
