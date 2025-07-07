import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReview = async (movie_id) => {
  const response = await api.get(
    `/movie/${movie_id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

export const useMovieReviewQuery = (movie_id) => {
  return useQuery({
    queryKey: ["movie-review", movie_id],
    queryFn: () => fetchMovieReview(movie_id),
  });
};
