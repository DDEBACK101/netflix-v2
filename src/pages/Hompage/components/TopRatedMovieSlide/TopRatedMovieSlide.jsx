import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/reponsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
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
        title="TopRated Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
