import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
// https://mui.com/material-ui/material-icons/?query=exit
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useGetListQuery } from '../../services/TMDB';
import { userSelector } from '../../features/auth';

import { RatedCards } from '..';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  // NOTE: Whenever this page is loaded, we want to refetch the data once.
  // NOTE: When an additional request is performed for the same data,
  // NOTE: RTK Query will provide the existing cached data rather than sending an additional request to the server.
  // NOTE: That's why we need to use refetch to get the latest data.
  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/filmpire';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        {/* gutterBottom adds margin-bottom */}
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography variant="h5">Add favorite or watchlist some movies to see them here!</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist Movies" data={watchlistMovies} />
          </Box>
        )}
    </Box>
  );
};

export default Profile;
