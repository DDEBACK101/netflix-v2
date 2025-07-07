import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieVideo = async (movieId) => {
  const response = await api.get(
    `/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  return response.data.results; // 응답 데이터를 반환
};

export const useMovieVideoQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-video", movieId],
    queryFn: () => fetchMovieVideo(movieId),
  });
};
