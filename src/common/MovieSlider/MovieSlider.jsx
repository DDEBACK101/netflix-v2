import React from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <h3 className="title">{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        autoPlay={true} // 자동 슬라이딩 활성화
        autoPlaySpeed={3000} // 슬라이드 간격 (밀리초)
        showDots={true} // 항목 점 표시
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
