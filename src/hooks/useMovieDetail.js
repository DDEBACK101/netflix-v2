import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = async (movieId) => {
  const response = await api.get(`/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
  return response.data; // 응답 데이터를 반환
};

export const useMovieDetailQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
  });
};
