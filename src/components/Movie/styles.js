import { makeStyles } from '@mui/styles';

// theme is from src/index.js
export default makeStyles(() => ({
  movie: {
    padding: '10px',
  },
  title: {
    // ellipsis is for overflow text
    textOverflow: 'ellipsis',
    color: 'theme.palette.text.primary',
    width: '230px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '10px',
    marginBottom: '0px',
    textAlign: 'center',
  },
}));
