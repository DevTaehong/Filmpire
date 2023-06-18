import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// NOTE - Step 5 - Import the useGetMoviesQuery hook (Last step)
import { useGetMoviesQuery } from '../../services/TMDB';
// eslint-disable-next-line import/no-cycle
import { MovieList } from '..';

const Movies = () => {
  // https://redux-toolkit.js.org/tutorials/rtk-query
  // If I get an error like "Cannot read properties of undefined (reading 'results')"",
  // it's because I didn't use error, isFetching, or data
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  // It will happen when people search for a movie that doesn't exist
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occurred:';

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
