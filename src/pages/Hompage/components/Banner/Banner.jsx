import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("ddd", data);
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
    <div
      className="banner"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.results[0].poster_path}` +
          ")",
      }}
    >
      <div className="text-white banner-text-area">
        <h1 className="banner-info">{data?.results[0].title}</h1>
        <p className="banner-info" >{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
