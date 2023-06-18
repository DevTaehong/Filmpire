import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

// https://redux-toolkit.js.org/tutorials/rtk-query
// NOTE - 4. Step four - Add the API slice to the store (Go to step 5 with that link below)
// LINK /Users/taehong/Downloads/filmpire_jsm/src/components/Movies/Movies.jsx
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({ // Instantly return an object
    //* Get Movies by [Type]
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
