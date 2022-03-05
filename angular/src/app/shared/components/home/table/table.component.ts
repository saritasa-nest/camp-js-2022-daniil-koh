import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { FilmsService, TableFilmsParameters } from '../../../../core/services/films.service';
import { Film } from '../../../../core/models/film';
import { FilmDto } from '../../../../core/mappers/dto/film.dto';

/**
 * Table component.
 */
@Component({
  selector: 'sw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {

  public constructor(private readonly filmsService: FilmsService) {
  }

  /** Columns to show. */
  public readonly displayedColumns: readonly string[] = ['title', 'director', 'producer', 'created'];

  /** Length of films for table with chosen parameters.*/
  public resultsLength = 0;

  /** Flag is data loading.*/
  public isLoadingResults = true;

  /** Flag is rate limit is reached.*/
  public isRateLimitReached = false;

  /** Elements on page.*/
  public pageSize = 2;

  /** Index of previous page.*/
  public previousPage!: number;

  /** Films for table. */
  public films$!: Observable<Film[]>;

  @ViewChild(MatPaginator, { static: false })

  /**
   * Reference on Paginator.
   */
  private paginator!: MatPaginator;

  @ViewChild(MatSort)

  /**
   * Reference on sort table.
   */
  private sort!: MatSort;

  /**
   * Reference on input, field.
   */
  @ViewChild('input') private input!: ElementRef<HTMLInputElement>;

  /**
   * Reset page index when search string is changed.
   */
  private resetPagination = (): void => {
    this.paginator.pageIndex = 0;
  };

  /**
   * Set default value for sort field when search string is changed.
   */
  private changeFieldSortToDefault = (): void => {
    this.sort.active = 'title';
  };

  /**
   * Init table after init.
   */
  public ngAfterViewInit(): void {

    const inputChange$ = fromEvent<InputEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.resetPagination();
          this.changeFieldSortToDefault();
        }),
      );

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.input.nativeElement.value = '';
      this.resetPagination();
    });
    this.films$ = merge(this.sort.sortChange, this.paginator.page, inputChange$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          // To avoid error of empty direction.
          if (this.sort.direction === '') {
            this.sort.direction = 'asc';
          }
          const filmsParameters: TableFilmsParameters = {
            limitFilms: this.pageSize,
            sortField: this.sort.active as keyof FilmDto,
            sortKey: this.sort.direction,
            searchString: this.input.nativeElement.value,
          };

          if (this.paginator.pageIndex === 0) {
            return this.filmsService?.getFilms(filmsParameters).pipe(

              // Only refresh the result length if there is new data. In case of rate
              // limit errors, we do not want to reset the paginator to zero, as that
              // would prevent users from re-triggering requests.
              tap(data => {
                this.resetPagination();
                this.resultsLength = data.length;
              }),
              map(data => data.slice(0, this.pageSize)),
            );
          } else if (this.paginator.pageIndex > this.previousPage) {
            this.previousPage = this.paginator.pageIndex;
            return this.filmsService?.getNextPage(filmsParameters);
          }
          this.previousPage = this.paginator.pageIndex;
          return this.filmsService?.getPreviousPage(filmsParameters);

        }),
        map(data => {

          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          return data;
        }),
      );
  }
}
