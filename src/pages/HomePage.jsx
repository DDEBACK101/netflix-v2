import { Alert, Container } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import { useGenres } from "../hooks/useGenres";
import { useMovieCollection } from "../hooks/useMovieCollection";

const HomePage = () => {
  const popularQuery = useMovieCollection("popular", "/movie/popular");
  const topRatedQuery = useMovieCollection("top-rated", "/movie/top_rated");
  const upcomingQuery = useMovieCollection("upcoming", "/movie/upcoming");
  const genresQuery = useGenres();

  const isLoading =
    popularQuery.isLoading || topRatedQuery.isLoading || upcomingQuery.isLoading || genresQuery.isLoading;

  const isError =
    popularQuery.isError || topRatedQuery.isError || upcomingQuery.isError || genresQuery.isError;

  const errorMessage =
    popularQuery.error?.message ||
    topRatedQuery.error?.message ||
    upcomingQuery.error?.message ||
    genresQuery.error?.message;

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
        <Alert variant="danger">{errorMessage}</Alert>
      </Container>
    );
  }

  return (
    <>
      <HeroBanner movie={popularQuery.data?.[0]} genres={genresQuery.data || []} />

      <MovieSection
        title="Popular now"
        description="Popular picks with a cleaner desktop and mobile layout."
        movies={popularQuery.data || []}
        linkTo="/movies"
      />

      <MovieSection
        title="Top rated"
        description="Highly rated movies that work well for quick browsing."
        movies={topRatedQuery.data || []}
        linkTo="/movies?sort=rating_desc"
      />

      <MovieSection
        title="Upcoming"
        description="New releases to watch next."
        movies={upcomingQuery.data || []}
        linkTo="/movies?sort=release_desc"
      />
    </>
  );
};

export default HomePage;
