import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreIdOrCategoryName: '',
  page: 1,
  searchQuery: '',
};

// https://redux-toolkit.js.org/tutorials/quick-start
export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    // NOTE dispatch use them
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
