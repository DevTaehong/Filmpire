import React from 'react';
import { Box, Typography, Button } from '@mui/material';
// https://mui.com/material-ui/material-icons/?query=exit
import { ExitToApp } from '@mui/icons-material';

// import { useSelector } from 'react-redux';
// import { userSelector } from '../../features/auth';

const Profile = () => {
  // const { user } = useSelector(userSelector);
  const favoriteMovies = [];

  const logout = () => {
    localStorage.clear();

    window.location.href = '/';
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
      {!favoriteMovies.length
        ? <Typography variant="h5">Add favorite or watch list some movies to see them here!</Typography>
        : (
          <Box>
            FAVORITE MOVIES
          </Box>
        )}
    </Box>
  );
};

export default Profile;
