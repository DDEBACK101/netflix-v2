import axios from "axios";

const TMDB_BEARER_TOKEN =
  process.env.REACT_APP_TMDB_TOKEN ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNkMGNmNDBlMjBmODJjZDRhNWU3ZGJlNzg0MTUzYyIsIm5iZiI6MTcyMzAyMDc2MC4wOTQzNTMsInN1YiI6IjY1NDhmOTExNmJlYWVhMDEyYzhmOTg4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h_zRbAC0nYuFtR2AUUou7J-gBzFDBbIshRmJV0467_8";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
});

export default api;
