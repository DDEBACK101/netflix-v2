import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHeart,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useGenres } from "../hooks/useGenres";
import "./MovieCard.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { data: genres = [] } = useGenres();

  const genreNames = movie.genre_ids
    ?.map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
    .filter(Boolean)
    .slice(0, 3);

  const isFavorite = favoriteIds.has(movie.id);

  const openDetail = () => navigate(`/movies/${movie.id}`);

  return (
    <article className="movie-card-v2 surface-card">
      <button
        type="button"
        className="favorite-toggle"
        onClick={(event) => {
          event.stopPropagation();
          toggleFavorite(movie);
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        data-active={isFavorite}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>

      <button type="button" className="movie-card-button" onClick={openDetail}>
        <div className="movie-poster-wrap">
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster-image"
            />
          ) : (
            <div className="poster-fallback">No Poster</div>
          )}

          <div className="movie-overlay">
            <div className="movie-overlay-content">
              <div className="movie-badges">
                {(genreNames || []).map((genreName) => (
                  <Badge key={genreName} bg="danger">
                    {genreName}
                  </Badge>
                ))}
              </div>

              <p className="movie-overview">
                {movie.overview?.trim()
                  ? movie.overview.slice(0, 120) + (movie.overview.length > 120 ? "..." : "")
                  : "No overview available yet."}
              </p>

              <span className="overlay-cta">View details</span>
            </div>
          </div>
        </div>

        <div className="movie-card-body">
          <h3>{movie.title}</h3>
          <div className="movie-meta-grid">
            <span>
              <FontAwesomeIcon icon={faStar} />
              {Number(movie.vote_average || 0).toFixed(1)}
            </span>
            <span>
              <FontAwesomeIcon icon={faUsers} />
              {Math.round(movie.popularity || 0)}
            </span>
            <span>
              <FontAwesomeIcon icon={faCalendar} />
              {(movie.release_date || "TBA").slice(0, 4)}
            </span>
          </div>
        </div>
      </button>
    </article>
  );
};

export default MovieCard;
