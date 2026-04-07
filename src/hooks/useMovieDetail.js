import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: { language: "en-US", append_to_response: "videos,recommendations" },
  });
  return response.data;
};

export const useMovieDetail = (movieId) =>
  useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    enabled: Boolean(movieId),
  });
