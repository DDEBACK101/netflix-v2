import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGenres = async () => {
  const response = await api.get("/genre/movie/list?language=en-US");
  return response.data.genres;
};

export const useGenres = () =>
  useQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60,
  });
