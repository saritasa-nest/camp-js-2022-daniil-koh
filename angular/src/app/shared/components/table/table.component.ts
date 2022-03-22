import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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

import { FilmsService, SortedColumns, TableFilmsParameters } from '../../../core/services/films.service';
import { Film } from '../../../core/models/film';
import { arrayOfAll } from '../../../core/models/array-of-all';
import { DateFormatterPipe } from '../../pipes/date-formatter.pipe';

const arrayOfAllShowedColumns = arrayOfAll<SortedColumns>();

/**
 * Table component.
 */
@UntilDestroy()
@Component({
  selector: 'sw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly router: Router,
  ) {
    this.dateFormatterPipe = new DateFormatterPipe();
  }

  /** Date pipe.*/
  public readonly dateFormatterPipe;

  /** Columns to show. */
  public readonly displayedColumns = arrayOfAllShowedColumns(['title', 'director', 'producer', 'created']);

  /** Length of films for table with chosen parameters.*/
  public resultsLength = 0;

  /** Flag is data loading.*/
  public isLoadingResults = true;

  /** Elements on page.*/
  public pageSize = 2;

  /** Index of previous page.*/
  public previousPage = 0;

  /** Films for table. */
  public films$!: Observable<Film[]>;

  /**
   * Reference on Paginator.
   */
  @ViewChild(MatPaginator, { static: false })
  private paginator!: MatPaginator;

  /**
   * Reference on sort table.
   */
  @ViewChild(MatSort, { static: false })
  private sort!: MatSort;

  /**
   * Reference on input, field.
   */
  @ViewChild('input', { static: false })
  private input!: ElementRef<HTMLInputElement>;

  /**
   * Reset page index when search string is changed.
   */
  private resetPagination(): void {
    this.paginator.pageIndex = 0;
  }

  /**
   * Navigate to detail page by film id.
   * @param filmId Film id.
   */
  public goToDetailPage(filmId: string): void {
    this.router.navigate([`/details`], { queryParams: { id: filmId } });
  }

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

    // Init stream here, because we use input native element, and it always init in afterViewInit block.
    // Before this lifecycle step  this.input.nativeElement is undefined.
    const inputChange$ = fromEvent<InputEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.resetPagination();
          this.changeFieldSortToDefault();
        }),
        untilDestroyed(this),
      );

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(() => {
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
            sortField: this.sort.active as SortedColumns,
            sortKey: this.sort.direction,
            searchString: this.input.nativeElement.value,
          };
          if (this.paginator.pageIndex === 0) {
            this.previousPage = this.paginator.pageIndex;
            return this.filmsService?.getFilms(filmsParameters).pipe(

              // Only refresh the result length if there is new data. In case of rate
              // limit errors, we do not want to reset the paginator to zero, as that
              // would prevent users from re-triggering requests.
              tap(data => {
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
          if (data === null) {
            return [];
          }
          return data;
        }),
      );
  }
}
