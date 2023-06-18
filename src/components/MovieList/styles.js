import { makeStyles } from '@mui/styles';

// theme is from src/index.js
export default makeStyles((theme) => ({
  moviesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
