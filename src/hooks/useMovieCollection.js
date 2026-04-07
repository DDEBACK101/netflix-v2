import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchCollection = async ({ endpoint, page = 1 }) => {
  const response = await api.get(endpoint, { params: { language: "en-US", page } });
  return response.data.results;
};

export const useMovieCollection = (key, endpoint, options = {}) =>
  useQuery({
    queryKey: ["movie-collection", key, options.page || 1],
    queryFn: () => fetchCollection({ endpoint, page: options.page }),
    staleTime: 1000 * 60 * 10,
  });
