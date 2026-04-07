import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const SORT_MAP = {
  popularity_desc: "popularity.desc",
  popularity_asc: "popularity.asc",
  rating_desc: "vote_average.desc",
  rating_asc: "vote_average.asc",
  release_desc: "primary_release_date.desc",
  release_asc: "primary_release_date.asc",
};

const fetchMovies = async ({ keyword, page, sortBy, selectedGenre }) => {
  const trimmedKeyword = keyword?.trim();
  const isSearching = Boolean(trimmedKeyword);

  if (isSearching) {
    const response = await api.get("/search/movie", {
      params: {
        query: trimmedKeyword,
        page,
        include_adult: false,
        language: "en-US",
      },
    });

    let results = response.data.results;

    if (selectedGenre) {
      results = results.filter((movie) => movie.genre_ids?.includes(Number(selectedGenre)));
    }

    if (sortBy === "rating_desc") {
      results = [...results].sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "rating_asc") {
      results = [...results].sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortBy === "release_desc") {
      results = [...results].sort(
        (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0)
      );
    } else if (sortBy === "release_asc") {
      results = [...results].sort(
        (a, b) => new Date(a.release_date || 0) - new Date(b.release_date || 0)
      );
    } else if (sortBy === "popularity_asc") {
      results = [...results].sort((a, b) => a.popularity - b.popularity);
    } else {
      results = [...results].sort((a, b) => b.popularity - a.popularity);
    }

    return {
      ...response.data,
      results,
      total_pages: Math.min(response.data.total_pages || 1, 500),
      total_results: response.data.total_results || results.length,
    };
  }

  const response = await api.get("/discover/movie", {
    params: {
      page,
      include_adult: false,
      language: "en-US",
      sort_by: SORT_MAP[sortBy] || SORT_MAP.popularity_desc,
      with_genres: selectedGenre || undefined,
    },
  });

  return {
    ...response.data,
    total_pages: Math.min(response.data.total_pages || 1, 500),
  };
};

export const useMovies = ({ keyword, page, sortBy, selectedGenre }) =>
  useQuery({
    queryKey: ["movies", keyword || "", page, sortBy, selectedGenre || ""],
    queryFn: () => fetchMovies({ keyword, page, sortBy, selectedGenre }),
    keepPreviousData: true,
  });
