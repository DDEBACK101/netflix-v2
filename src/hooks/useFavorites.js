import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "netflix-v2-favorites";
const STORAGE_EVENT = "netflix-v2-favorites-updated";

const readFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const writeFavorites = (nextFavorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
  window.dispatchEvent(new Event(STORAGE_EVENT));
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => readFavorites());

  useEffect(() => {
    const syncFavorites = () => setFavorites(readFavorites());

    window.addEventListener("storage", syncFavorites);
    window.addEventListener(STORAGE_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(STORAGE_EVENT, syncFavorites);
    };
  }, []);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((movie) => movie.id)),
    [favorites]
  );

  const toggleFavorite = (movie) => {
    const nextFavorites = favoriteIds.has(movie.id)
      ? favorites.filter((item) => item.id !== movie.id)
      : [
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            vote_average: movie.vote_average,
            popularity: movie.popularity,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids || movie.genres?.map((genre) => genre.id) || [],
            adult: movie.adult,
            overview: movie.overview,
          },
          ...favorites,
        ];

    writeFavorites(nextFavorites);
    setFavorites(nextFavorites);
  };

  return { favorites, favoriteIds, toggleFavorite };
};
