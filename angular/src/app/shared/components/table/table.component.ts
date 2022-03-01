import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { debounceTime, distinctUntilChanged, fromEvent, map, merge, startWith, switchMap, tap } from 'rxjs';

import { Database } from '../../../core/services/database.service';
import { FilmModel } from '../../../core/models/film.model';

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

  public constructor(private database: Database, private changeDetectorRefs: ChangeDetectorRef) {
  }

  /** Columns to show. */
  public displayedColumns: string[] = ['title', 'director', 'producer', 'created'];

  /** Data to fill table.*/
  public data!: FilmModel[];

  /** Len of data.*/
  public resultsLength = 0;

  /** Flag is data loading.*/
  public isLoadingResults = true;

  /** Flag is rate limit is reached.*/
  public isRateLimitReached = false;

  /** Elements on page.*/
  public pageSize = 2;

  /** Index of previous page.*/
  public previousPage!: number;

  /** Filter input value.*/
  public filterInputValue = '';

  /**
   * @inheritDoc
   * Reference on Paginator.
   */
  @ViewChild(MatPaginator, { static: false }) private paginator!: MatPaginator;

  /**
   * @inheritDoc
   * Reference on sort table.
   */
  @ViewChild(MatSort) private sort!: MatSort;

  /**
   * @inheritDoc
   * Reference on input, field.
   */
  @ViewChild('input') private input!: ElementRef<HTMLInputElement>;

  /**
   * Init table after init.
   */
  public ngAfterViewInit(): void {

    /** Server-side search. */
    const inputChange$ = fromEvent<InputEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.sort.active = 'title';

        }),
      );

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.input.nativeElement.value = '';
      this.paginator.pageIndex = 0;
    });
    merge(this.sort.sortChange, this.paginator.page, inputChange$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          // To avoid error of empty direction.
          if (this.sort.direction === '') {
            this.sort.direction = 'asc';
          }

          if (this.paginator.pageIndex === 0) {
            return this.database?.getFilms(this.pageSize, this.sort.active, this.sort.direction, this.input.nativeElement.value).pipe(

              // Only refresh the result length if there is new data. In case of rate
              // limit errors, we do not want to reset the paginator to zero, as that
              // would prevent users from re-triggering requests.
              tap(data => {
                this.previousPage = 0;
                this.resultsLength = data.length;
              }),
              map(data => data.slice(0, this.pageSize)),
            );
          } else if (this.paginator.pageIndex > this.previousPage) {
            this.previousPage = this.paginator.pageIndex;
            return this.database?.getNextPage(this.pageSize, this.sort.active, this.sort.direction, this.input.nativeElement.value);
          }
          this.previousPage = this.paginator.pageIndex;
          return this.database?.getPreviousPage(this.pageSize, this.sort.active, this.sort.direction, this.input.nativeElement.value);

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
      )
      .subscribe(data => {
        this.data = data;
        this.changeDetectorRefs.detectChanges();
      });
  }
}
