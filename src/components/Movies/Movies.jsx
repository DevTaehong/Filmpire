import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// NOTE - Step 5 - Import the useGetMoviesQuery hook (Last step)
import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  // https://redux-toolkit.js.org/tutorials/rtk-query
  const { data } = useGetMoviesQuery();

  console.log(data);

  return (
    <div>
      Movies
    </div>
  );
};

export default Movies;
