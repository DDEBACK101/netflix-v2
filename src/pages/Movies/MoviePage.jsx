import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Alert, Col, Container, Row, Dropdown } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("most");
  const keyword = query.get("q");
  const { data, isLoading, error, isError } = useSearchMovieQuery({
    keyword,
    page,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const getSortOptionText = () => {
    switch (sortOption) {
      case "most":
        return "Most popular";
      case "least":
        return "Least popular";
      case "highest":
        return "Highest rated";
      case "lowest":
        return "Lowest rated";
      default:
        return "Sort";
    }
  };

  const sortedData =
    data?.results?.sort((a, b) => {
      if (sortOption === "most") return b.popularity - a.popularity;
      if (sortOption === "least") return a.popularity - b.popularity;
      if (sortOption === "highest") return b.vote_average - a.vote_average;
      return a.vote_average - b.vote_average;
    }) || [];

  const showDetail = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <ClipLoader color={"#123abc"} loading={isLoading} size={150} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container className="moviepage-container">
      <Row className="mb-3">
        <Col>
          <h1 className="title">Sort Order</h1>
        </Col>
      </Row>

      {/* 정렬 + 페이지네이션 */}
      <Row className="sort-pagination-wrapper">
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="sort-dropdown"
            >
              {getSortOptionText()}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%", textAlign: "center" }}>
              {["most", "least", "highest", "lowest"].map((option) => (
                <Dropdown.Item
                  key={option}
                  className="custom-dropdown-item"
                  onClick={() => handleSortOptionChange(option)}
                >
                  {getSortOptionText(option)}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col xs={12} md={8}
          className="pagenation"
        >
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages || 0}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>

      {/* 영화 카드 목록 */}
      <Row>
        {sortedData.map((movie, index) => (
          <Col key={index} lg={4} md={6} xs={12} className="mb-2">
            <div className="movie-card-wrapper">
              <MovieCard onClick={() => showDetail(movie.id)} movie={movie} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MoviePage;
