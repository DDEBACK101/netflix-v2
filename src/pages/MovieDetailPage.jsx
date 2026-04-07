import { Alert, Badge, Button, Col, Container, Ratio, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHeart,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../hooks/useFavorites";
import { useMovieDetail } from "../hooks/useMovieDetail";
import "./MovieDetailPage.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetailPage = () => {
  const { movie_id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetail(movie_id);
  const { favoriteIds, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <ClipLoader color="#e50914" size={70} />
      </div>
    );
  }

  if (isError) {
    return (
      <Container fluid="xl" className="py-5">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  const trailer = data?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  const recommendations = data?.recommendations?.results?.slice(0, 4) || [];
  const isFavorite = favoriteIds.has(data.id);

  return (
    <div
      className="detail-page"
      style={{
        backgroundImage: data.backdrop_path
          ? `linear-gradient(180deg, rgba(7, 9, 13, 0.16), rgba(7, 9, 13, 0.94) 46%), url(${IMAGE_BASE}${data.backdrop_path})`
          : undefined,
      }}
    >
      <Container fluid="xl">
        <div className="detail-backdrop-surface surface-card">
          <Row className="g-4 align-items-start">
            <Col md={4} lg={3}>
              {data.poster_path ? (
                <img
                  src={`${POSTER_BASE}${data.poster_path}`}
                  alt={data.title}
                  className="detail-poster"
                />
              ) : (
                <div className="detail-poster poster-fallback">No Poster</div>
              )}
            </Col>

            <Col md={8} lg={9}>
              <div className="d-flex flex-wrap justify-content-between gap-3">
                <div>
                  <h1 className="detail-title">{data.title}</h1>
                  <p className="detail-tagline">{data.tagline || "No tagline available."}</p>
                </div>

                <Button variant="outline-light" onClick={() => toggleFavorite(data)}>
                  <FontAwesomeIcon icon={faHeart} className={isFavorite ? "text-danger" : "opacity-75"} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
              </div>

              <div className="detail-badges">
                {data.genres?.map((genre) => (
                  <Badge key={genre.id} bg="danger">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="detail-stats">
                <span>
                  <FontAwesomeIcon icon={faStar} />
                  {Number(data.vote_average || 0).toFixed(1)}
                </span>
                <span>
                  <FontAwesomeIcon icon={faUsers} />
                  {Math.round(data.popularity || 0)}
                </span>
                <span>
                  <FontAwesomeIcon icon={faCalendar} />
                  {data.release_date || "Unknown release"}
                </span>
              </div>

              <p className="detail-overview">{data.overview}</p>

              <div className="detail-info-grid">
                <div>
                  <span>Runtime</span>
                  <strong>{data.runtime ? `${data.runtime} min` : "Unknown"}</strong>
                </div>
                <div>
                  <span>Budget</span>
                  <strong>
                    {data.budget ? `$${data.budget.toLocaleString()}` : "Not disclosed"}
                  </strong>
                </div>
                <div>
                  <span>Revenue</span>
                  <strong>
                    {data.revenue ? `$${data.revenue.toLocaleString()}` : "Not disclosed"}
                  </strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{data.status || "Unknown"}</strong>
                </div>
              </div>
            </Col>
          </Row>

          {trailer && (
            <section className="section-block">
              <div className="section-title">
                <h2>Trailer</h2>
              </div>
              <Ratio aspectRatio="16x9">
                <YouTube
                  videoId={trailer.key}
                  opts={{ width: "100%", height: "100%", playerVars: { autoplay: 0 } }}
                />
              </Ratio>
            </section>
          )}

          {!!recommendations.length && (
            <section className="section-block">
              <div className="section-title">
                <h2>More like this</h2>
              </div>
              <Row className="g-3 g-lg-4">
                {recommendations.map((movie) => (
                  <Col key={movie.id} xs={6} md={3}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            </section>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MovieDetailPage;
