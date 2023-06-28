import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';

import { fetchToken } from '../utils';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory';
import { ColorModeContext } from '../utils/ToggleColorMode';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    alanBtn({
      key: 'd3b7ac65651e17d94c565c5bba711ab02e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

          if (foundGenre) {
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top rated' : genreOrCategory;
            dispatch(selectGenreOrCategory(category.id));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            // NOTE: Not using colorMode.toggleColorMode(); because it's not like clicking the dark mode button in NavBar.jsx
            // NOTE: when it's light mode and say "light mode", it still changes to dark mode.
            // NOTE: For example, In ToggleColorMode.jsx and line 10, setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            // NOTE: 1. prevMode is 'light' and "prevMode === light" is true so it changes to dark mode.
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          history.push('/');
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
