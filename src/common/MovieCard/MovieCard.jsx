import React from "react";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie, onClick }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/movies/${movie.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick} // onClick 이벤트 핸들러를 처리
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1 className="card-ml card-title">{movie.title}</h1>
        <div className="card-ml genre">
          {showGenre(movie.genre_ids).map((genre, index) => (
            <Badge bg="danger" key={index} className="me-1">
              {genre}
            </Badge>
          ))}
        </div>
        <div className="card-ml genre">
          <div className="card-mb">
            <img
              className="star_img card-mr"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Yellow_Star_with_rounded_edges.svg/1075px-Yellow_Star_with_rounded_edges.svg.png"
              alt="star"
            />
            <span className="rated">Rating: {movie.vote_average}</span>
          </div>
          <div className="card-mb popularity">
            <FontAwesomeIcon className="card-mr" icon={faUsers} size="lg" />
            {movie.popularity}
          </div>
          <div className="age">{movie.adult ? "over 18" : "under 18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
