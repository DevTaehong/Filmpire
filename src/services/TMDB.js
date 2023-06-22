import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

// https://redux-toolkit.js.org/tutorials/rtk-query
// NOTE - 4. Step four - Add the API slice to the store (Go to step 5 with that link below)
// LINK /Users/taehong/Downloads/filmpire_jsm/src/components/Movies/Movies.jsx
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({ // Instantly return an object
    // Get Genre
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get Movies by Genre Id
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get Popular Movies
        return `movie/popular?page=${page}?api_key=${tmdbApiKey}`;
      },
    }),
    // Get Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    // Get User Specific List
    getRecommendations: builder.query({
      query: ({ movieId, list }) => `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),

    // Get an Actor
    getActor: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
    }),

    // Get Actor's Movies
    getActorMovies: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorMoviesQuery,
} = tmdbApi;
