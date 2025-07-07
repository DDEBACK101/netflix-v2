import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/reponsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
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
  return (
    <div>
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
