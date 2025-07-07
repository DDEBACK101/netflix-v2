import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Alert, Col, Container, Row, Dropdown } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";

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
    setPage(1); // keyword 변경 시 페이지를 1로 초기화
  }, [keyword]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const sortedData = data?.results?.sort((a, b) => {
    if (sortOption === "most") {
      return b.popularity - a.popularity;
    } else if (sortOption === "least") {
      return a.popularity - b.popularity;
    } else if (sortOption === "highest") {
      return b.vote_average - a.vote_average;
    } else {
      return a.vote_average - b.vote_average;
    }
  }) || [];

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color={"#123abc"} loading={isLoading} size={150} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const getSortOptionText = () => {
    if (sortOption === "most") {
      return "Most popular";
    } else if (sortOption === "least") {
      return "Least popular";
    } else if (sortOption === "highest") {
      return "Highest rated";
    } else {
      return "Lowest rated";
    }
  };

  const showDetail = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Container className="moviepage-container">
      <Row>
        <h1 className="title">Sort Order</h1>
        <Col lg={4} xs={12}>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                background: "linear-gradient(to right, red, black)",
                width: "20vw",
                border: "2px solid",
                borderImage: "linear-gradient(to right, red, black) 1",
                fontWeight: "bold",
              }}
            >
              {getSortOptionText()}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleSortOptionChange("most")}
                style={{ width: "20vw", textAlign: "center" }}
              >
                Most popular
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSortOptionChange("least")}
                style={{ width: "20vw", textAlign: "center" }}
              >
                Least popular
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSortOptionChange("highest")}
                style={{ width: "20vw", textAlign: "center" }}
              >
                Highest rated
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSortOptionChange("lowest")}
                style={{ width: "20vw", textAlign: "center" }}
              >
                Lowest rated
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {sortedData.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard onClick={() => showDetail(movie.id)} movie={movie} /> {/* onClick 이벤트 핸들러 전달 */}
              </Col>
            ))}
          </Row>
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
    </Container>
  );
};

export default MoviePage;
