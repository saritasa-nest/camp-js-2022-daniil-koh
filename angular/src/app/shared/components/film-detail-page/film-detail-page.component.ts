import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, map } from 'rxjs';

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
@Component({
  selector: 'sw-film-detail-page',
  templateUrl: './film-detail-page.component.html',
  styleUrls: ['./film-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailPageComponent implements OnInit, AfterViewInit {
  public constructor(
    private readonly filmDetailsService: FilmDetailsService,
    private readonly route: ActivatedRoute,
  ) {
  }

  /** Film id.*/
  public filmId!: string;

  /** Observable with film details.*/
  public filmDetails!: Film;

  /** Loading status.*/
  public isLoading$ = new BehaviorSubject<boolean>(true);

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.route.queryParams.pipe(
      map(params => (params as DetailPageParams).id),
    ).subscribe({
      next: id => {
        this.filmId = id;
      },
    });
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    // @ts-ignore
    this.filmDetailsService.getFilmDetails(this.filmId)
      .subscribe(
        filmDetails => {
          this.isLoading$.next(false);
          this.filmDetails = filmDetails;
        },
      );
  }

}
