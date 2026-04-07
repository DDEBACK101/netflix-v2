import { useEffect, useMemo, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieFilters from "../components/MovieFilters";
import PaginationBar from "../components/PaginationBar";
import { useGenres } from "../hooks/useGenres";
import { useMovies } from "../hooks/useMovies";
import "./MoviesPage.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const pageFromUrl = Number(searchParams.get("page") || 1);
  const sortFromUrl = searchParams.get("sort") || "popularity_desc";
  const genreFromUrl = searchParams.get("genre") || "";

  const [page, setPage] = useState(pageFromUrl);
  const [sortBy, setSortBy] = useState(sortFromUrl);
  const [selectedGenre, setSelectedGenre] = useState(genreFromUrl);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    setSortBy(sortFromUrl);
  }, [sortFromUrl]);

  useEffect(() => {
    setSelectedGenre(genreFromUrl);
  }, [genreFromUrl]);

  const moviesQuery = useMovies({ keyword, page, sortBy, selectedGenre });
  const genresQuery = useGenres();

  const updateParams = (next) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined || value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    updateParams({ page: nextPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
    updateParams({ sort: value, page: null });
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    setPage(1);
    updateParams({ genre: value, page: null });
  };

  const handleReset = () => {
    setSortBy("popularity_desc");
    setSelectedGenre("");
    setPage(1);
    updateParams({ sort: null, genre: null, page: null });
  };

  const movies = useMemo(() => moviesQuery.data?.results || [], [moviesQuery.data]);

  return (
    <Container fluid="xl">
      <section className="page-hero">
        <h1>{keyword ? `Results for “${keyword}”` : "Discover movies"}</h1>
        <p>
          Better responsive layout, cleaner Bootstrap cards, genre filters, sorting, and pagination in one page.
        </p>
      </section>

      <Row className="g-4">
        <Col xl={3}>
          <MovieFilters
            keyword={keyword}
            genres={genresQuery.data || []}
            selectedGenre={selectedGenre}
            sortBy={sortBy}
            onGenreChange={handleGenreChange}
            onSortChange={handleSortChange}
            onReset={handleReset}
          />
        </Col>

        <Col xl={9}>
          <div className="surface-card p-3 p-lg-4">
            <div className="results-header">
              <div>
                <h2 className="h4 fw-bold mb-1">Movie list</h2>
                <p className="text-white-50 mb-0">
                  {moviesQuery.data?.total_results
                    ? `${moviesQuery.data.total_results.toLocaleString()} results found`
                    : keyword
                    ? "No matching titles found yet."
                    : "Browse the catalog with filters."}
                </p>
              </div>
            </div>

            {moviesQuery.isLoading || genresQuery.isLoading ? (
              <div className="results-loader">
                <ClipLoader color="#e50914" size={60} />
              </div>
            ) : moviesQuery.isError || genresQuery.isError ? (
              <Alert variant="danger">
                {moviesQuery.error?.message || genresQuery.error?.message}
              </Alert>
            ) : movies.length ? (
              <>
                <Row className="g-3 g-lg-4">
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={6} md={4} xxl={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>

                <PaginationBar
                  page={page}
                  totalPages={moviesQuery.data?.total_pages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="empty-state">
                <h3>No movies found</h3>
                <p>Try a different search word, another genre, or reset the filters.</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesPage;
