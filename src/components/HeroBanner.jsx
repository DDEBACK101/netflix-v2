import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import "./HeroBanner.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const HeroBanner = ({ movie, genres = [] }) => {
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavorites();

  if (!movie) {
    return null;
  }

  const genreNames = movie.genre_ids
    ?.map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
    .filter(Boolean)
    .slice(0, 3);

  const isFavorite = favoriteIds.has(movie.id);
  const heroImage = movie.backdrop_path || movie.poster_path;

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: heroImage
          ? `linear-gradient(90deg, rgba(6, 8, 12, 0.92) 0%, rgba(6, 8, 12, 0.74) 42%, rgba(6, 8, 12, 0.92) 100%), url(${IMAGE_BASE}${heroImage})`
          : undefined,
      }}
    >
      <Container fluid="xl">
        <Row className="align-items-center gy-4">
          <Col lg={7} xl={6}>
            <Badge bg="danger" className="hero-chip mb-3">
              Featured today
            </Badge>
            <h1>{movie.title}</h1>
            <div className="hero-meta">
              <span>
                <FontAwesomeIcon icon={faStar} />
                {Number(movie.vote_average || 0).toFixed(1)}
              </span>
              <span>{movie.release_date || "Release date unknown"}</span>
              {(genreNames || []).map((genreName) => (
                <Badge key={genreName} bg="light" text="dark">
                  {genreName}
                </Badge>
              ))}
            </div>
            <p>{movie.overview || "No overview available."}</p>
            <div className="hero-actions">
              <Button variant="danger" size="lg" onClick={() => navigate(`/movies/${movie.id}`)}>
                <FontAwesomeIcon icon={faCirclePlay} />
                View details
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => toggleFavorite(movie)}
              >
                <FontAwesomeIcon icon={faHeart} className={isFavorite ? "text-danger" : "opacity-75"} />
                {isFavorite ? "Saved" : "Add to favorites"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroBanner;
