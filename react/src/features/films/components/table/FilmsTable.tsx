import {
  useCallback, useEffect, useRef, useState, VFC,
} from 'react';
import {
  CircularProgress,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  selectFilms,
  selectFilmsCursors,
  selectFilmsLoading,
  selectSearchString,
} from '../../../../store/films/selectors';
import { getAllFilms, getNextPage } from '../../../../store/films/dispatchers';
import { FilmsService } from '../../../../api/services/films.service';
import { FilmWithId } from '../../../../api/models/film-with-id';
import './Table.css';
import { arrayOfAll } from '../../../../models/arrayOfAll';
import { capitalizeFirstLetter } from '../../../../mappers';

const filmsPerPage = 2;
const arrayOfAllShowedColumns = arrayOfAll<FilmsService.SortedColumns>();

const FilmsTable: VFC = () => {
  /** Films in table. */
  const [films, setFilms] = useState<FilmWithId[]>([]);
  /** Columns to sorting table. */
  const [sortedColumn, setSortedColumn] = useState<FilmsService.SortedColumns>('title');
  /** Direction to sorting table. */
  const [sortDirection, setSortDirection] = useState<FilmsService.SortDirection>('asc');
  /** Current page. */
  const [page, setPage] = useState(0);
  /** Get app dispatch. */
  const dispatch = useAppDispatch();
  /** Search string value. */
  const searchStringFilms = useAppSelector(selectSearchString);
  /** Films with ids. */
  const fetchedFilmsData = useAppSelector(selectFilms);
  /** Cursors for pagination. */
  const cursors = useAppSelector(selectFilmsCursors);
  /** Loading state. */
  const loading = useAppSelector(selectFilmsLoading);
  /** Observe if las film is visible in table. */
  const lastFilmObserver = useRef<IntersectionObserver>();
  /** Array of showing columns. */
  const sortedColumns = arrayOfAllShowedColumns(['title', 'producer', 'director', 'created']);

  /**
   * Handler to change sort.
   * @param header Header to sort by.
   */
  const handleRequestSort = (
    header: FilmsService.SortedColumns,
  ): void => {
    const isAsc = sortedColumn === header && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortedColumn(header);
  };

  /** Handler to go to next page. */
  const onNextPage = (): void => {
    setPage(prevState => prevState + 1);
    dispatch(getNextPage({
      limitFilms: filmsPerPage,
      sortField: sortedColumn,
      sortKey: sortDirection,
      searchString: searchStringFilms,
      cursors,
    }));
  };

  const lastFilmElementRef = useCallback(node => {
    if (loading) return;
    if (lastFilmObserver.current) lastFilmObserver.current.disconnect();
    lastFilmObserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onNextPage();
      }
    });
    if (node) lastFilmObserver.current.observe(node);
  }, [loading]);

  /** Fetch when film when user print something in input field. */
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(getAllFilms({
        limitFilms: filmsPerPage,
        sortField: sortedColumn,
        sortKey: sortDirection,
        searchString: searchStringFilms,
        cursors,
      }));
      setPage(0);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchStringFilms, sortDirection, sortedColumn]);

  /** If fetched films are empty just fetch again. */
  useEffect(() => {
    if (fetchedFilmsData.length === 0 && page !== 0) {
      dispatch(getNextPage({
        limitFilms: filmsPerPage,
        sortField: sortedColumn,
        sortKey: sortDirection,
        searchString: searchStringFilms,
        cursors,
      }));
    }
  }, [fetchedFilmsData]);

  /** Update films quantity, when films have fetched. If fetched films are empty just fetch again. */
  useEffect(() => {
    /** First time fetch all films. */
    if (page === 0) {
      setFilms([...fetchedFilmsData]);
    } else {
      setFilms(prevState => [...prevState, ...fetchedFilmsData.slice(0, filmsPerPage)]);
    }
  }, [fetchedFilmsData]);

  return (
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="films-table-header">
            {/* Use align here because mui do not let change it via css. */}
            {sortedColumns.map((header, index) => (
              <TableCell
                data-value={header}
                align={index !== 0 ? 'right' : undefined}
                sortDirection={sortedColumn === header ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortedColumn === header}
                  direction={sortedColumn === header ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort(header)}
                >
                  {capitalizeFirstLetter(header)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="films-table-body">
          {films.map((data, index) => (
            <TableRow
              id={data.id}
              data-index={index}
              ref={index + 1 === films.length ? lastFilmElementRef : null}
            >
              <TableCell component="th" scope="row">
                {data.title}
              </TableCell>
              <TableCell align="right">
                {data.producer.join(', ')}
              </TableCell>
              <TableCell align="right">
                {data.director}
              </TableCell>
              <TableCell align="right">
                {data.created.toISOString()}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            {loading && <CircularProgress className="films-loading" color="inherit" />}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilmsTable;
