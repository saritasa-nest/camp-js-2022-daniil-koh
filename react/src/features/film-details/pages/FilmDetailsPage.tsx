import { useEffect, VFC } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectFilmDetails, selectFilmDetailsLoading } from '../../../store/filmDetails/selectors';
import { getFilmDetails } from '../../../store/filmDetails/dispatchers';
import './FilmDetailsPage.css';

export const FilmDetailsPage: VFC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filmDetails = useAppSelector(selectFilmDetails);
  const loading = useAppSelector(selectFilmDetailsLoading);
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      dispatch(getFilmDetails(id));
    }
  }, []);

  if (loading || !filmDetails) return <CircularProgress className="film-details-loading" color="inherit" />;

  return (
    <Grid
      className="film-details-grid"
      container
      spacing={0}
    >
      <Grid item xs={6} md={2}>
        <Typography>
          Title:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.title}
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Director:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.director}
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Producer:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.producer}
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Date of creation:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.created.toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Release:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.releaseDate.toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Characters:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.charactersIds.join(', ')}
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Planets:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.planetsIds.join(', ')}
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Species:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.speciesIds.join(', ') }
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography>
          Starships:
        </Typography>
      </Grid>
      <Grid item xs={6} md={10}>
        <Typography>
          {filmDetails.starshipsIds.join(', ') }
        </Typography>
      </Grid>

    </Grid>

  );
};
