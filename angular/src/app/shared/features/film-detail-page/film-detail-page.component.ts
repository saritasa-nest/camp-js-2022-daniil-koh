import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, filter, map, Observable, shareReplay, startWith, switchMap } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { FilmDetailsService } from '../../../core/services/film-details.service';
import { Film } from '../../../core/models/film';

/**
 * Route params of detail page.
 */
interface DetailPageParams {

  /** Film id.*/
  readonly id: string;
}

/**
 * Film detail page.
 */
@UntilDestroy()
@Component({
  selector: 'sw-film-detail-page',
  templateUrl: './film-detail-page.component.html',
  styleUrls: ['./film-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailPageComponent implements OnInit {
  public constructor(
    private readonly filmDetailsService: FilmDetailsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,

  ) {
    this.filmDetails$ = this.filmId$.asObservable().pipe(
      filter(id => id !== ''),
      switchMap(id => this.filmDetailsService.getFilmDetails(id)),
      filter(filmDetails => !!filmDetails),
      map(filmDetails => filmDetails as Film),
      untilDestroyed(this),
      shareReplay(),
    );

    this.isLoading$ = this.filmDetails$.pipe(
      map(details => !details),
      startWith(true),
    );
  }

  /** Film id.*/
  public readonly filmId$ = new BehaviorSubject<string>('');

  /** Observable with film details.*/
  public filmDetails$: Observable<Film>;

  /** Loading status.*/
  public isLoading$: Observable<boolean>;

  /** Go to edit page with film id.*/
  public goToEditPage(): void {
    this.router.navigate([`/edit`], { queryParams: { id: this.filmId$.getValue() } });
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.route.queryParams.pipe(
      map(params => (params as DetailPageParams).id),
      untilDestroyed(this),
    ).subscribe({
      next: id => {
        this.filmId$.next(id);
      },
    });
  }
}
