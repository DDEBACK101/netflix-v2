import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieSection = ({ title, description, movies = [], linkTo = "/movies" }) => {
  if (!movies.length) {
    return null;
  }

  return (
    <section className="section-block">
      <Container fluid="xl">
        <div className="section-title">
          <div>
            <h2>{title}</h2>
            {description && <p className="text-white-50 mb-0">{description}</p>}
          </div>
          <Link to={linkTo} className="text-danger fw-semibold">
            See more
          </Link>
        </div>

        <Row className="g-3 g-lg-4">
          {movies.slice(0, 6).map((movie) => (
            <Col key={movie.id} xs={6} md={4} xl={2}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MovieSection;
