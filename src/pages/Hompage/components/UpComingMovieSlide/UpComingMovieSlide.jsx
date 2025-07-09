import React from "react";
import { useUpComingMoviesQuery } from "../../../../hooks/useUpComingMovies";
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/reponsive";

const UpComingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpComingMoviesQuery();
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
    <div style={{ marginTop: "7vh", marginBottom:"5vh" }}>
      <MovieSlider
        title="UpComing Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpComingMovieSlide;
