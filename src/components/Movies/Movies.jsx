import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';

import { useSelector } from 'react-redux';
// NOTE - Step 5 - Import the useGetMoviesQuery hook (Last step)
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination, FeaturedMovie } from '..';

const Movies = () => {
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const [page, setPage] = useState(1);

  // NOTE Theses states are from currentGenreOrCategory.js
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.genreOrCategory);

  // https://redux-toolkit.js.org/tutorials/rtk-query
  // If I get an error like "Cannot read properties of undefined (reading 'results')"",
  // it's because I didn't use error, isFetching, or data
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const numberOfMovies = lg ? 17 : 19;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  // It will happen when people search for a movie that doesn't exist
  if (!data?.results.length) {
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
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  );
};

export default Movies;
