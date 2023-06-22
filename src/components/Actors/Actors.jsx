import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorQuery, useGetActorMoviesQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useGetActorQuery(id);
  const { data: movies, error: actorMoviesError, isFetching: isActorMoviesFetching } = useGetActorMoviesQuery({ id, page });
  const classes = useStyles();

  if (isFetching || isActorMoviesFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error || actorMoviesError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={data.profile_path
              ? `https://image.tmdb.org/t/p/w780${data.profile_path}`
              : 'https://www.movienewz.com/img/films/poster-holder.jpg'}
            alt={data?.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" align="justify" paragraph style={{ marginBottom: '2rem' }}>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
              Back
            </Button>
          </Box>
        </Grid>
        <Box margin="2rem 0">
          <Typography variant="h2" gutterBottom align="center">Movies</Typography>
          {movies && <MovieList movies={movies} numberOfMovies={12} />}
          <Pagination currentPage={page} totalPages={movies.total_pages} setPage={setPage} />
        </Box>
      </Grid>
    </>
  );
};

export default Actors;
