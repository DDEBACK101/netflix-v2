import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <Container fluid="xl">
      <section className="page-hero">
        <h1>Favorites</h1>
        <p>Your saved movies stay in local storage, so you can preview the UI before merging.</p>
      </section>

      <div className="surface-card p-3 p-lg-4">
        {favorites.length ? (
          <Row className="g-3 g-lg-4">
            {favorites.map((movie) => (
              <Col key={movie.id} xs={6} md={4} xl={3}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="empty-state">
            <div>
              <h3>No favorites yet</h3>
              <p>Tap the heart on any card to save a movie here.</p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default FavoritesPage;
