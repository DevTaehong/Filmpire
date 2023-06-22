import { makeStyles } from '@mui/styles';

// theme is from src/index.js
export default makeStyles(() => ({
  image: {
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1em',
    maxWidth: '90%',
  },
}));
