import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommendation = async (movie_id) => {
  const response = await api.get(
    `/movie/${movie_id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

export const useMovieRecommendation = (movie_id) => {
  return useQuery({
    queryKey: ["movie-recommendation", movie_id],
    queryFn: () => fetchMovieRecommendation(movie_id),
  });
};
