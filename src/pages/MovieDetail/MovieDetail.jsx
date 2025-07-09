import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";
import { useMovieRecommendation } from "../../hooks/useMovieRecommendation";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";
import { ClipLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import MovieCard from "../../common/MovieCard/MovieCard";
import YouTube from "react-youtube";
import "./MovieDetail.style.css";

const MovieDetail = () => {
  const { movie_id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useMovieDetailQuery(movie_id);
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    isError: isReviewError,
    error: reviewError,
  } = useMovieReviewQuery(movie_id);
  const {
    data: recommendationData,
    isLoading: isRecommendationLoading,
    isError: isRecommendationError,
    error: recommendationError,
  } = useMovieRecommendation(movie_id);
  const { data: videoData } = useMovieVideoQuery(movie_id);

  const [showReviews, setShowReviews] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const handleWatchTrailer = () => setShowTrailer(true);
  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowReviews = () => setShowReviews(!showReviews);
  const handleShowRecommendation = () =>
    setShowRecommendations(!showRecommendations);

  const trailerKey = videoData?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )?.key;

  console.log("detail", data); // 콘솔에 데이터 출력
  console.log("movieid", movie_id);
  console.log("추천데이터", recommendationData);

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
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          {data?.poster_path && (
            <img
              className="detail_image"
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
              alt={data.title}
            />
          )}
        </Col>
        <Col>
          <h1>{data?.title}</h1>
          <div>
            {data?.genres?.map((genre, index) => (
              <Badge
                className={`genre_badge ${index === 0 ? "first_genre" : ""}`}
                key={genre.id}
                bg="danger"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
          <hr />
          <h4>
            <div className="section_1">
              <img
                className="star_img"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Yellow_Star_with_rounded_edges.svg/1075px-Yellow_Star_with_rounded_edges.svg.png"
                alt="star"
              />
              <div className="vote_average">{data?.vote_average}</div>
            </div>
            <div className="popularity">
              <FontAwesomeIcon icon={faUsers} size="30px" />
              {data?.popularity}
            </div>
            <div className="under_18">{data?.adult ? "청불" : "under 18"}</div>
          </h4>
          <hr />
          <div className="tagline">{data?.tagline}</div>
          <div>{data?.overview}</div>
          <hr />
          <div className="budget">
            <Badge pill bg="danger">
              budget
            </Badge>{" "}
            &nbsp;: {data?.budget}
          </div>
          <div className="revenue">
            <Badge pill bg="danger">
              revenue
            </Badge>{" "}
            &nbsp;: {data?.revenue}
          </div>
          <div className="release_date">
            <Badge pill bg="danger">
              release_date
            </Badge>{" "}
            &nbsp;: {data?.release_date}
          </div>
          <div className="time">
            <Badge pill bg="danger">
              time
            </Badge>{" "}
            &nbsp;: {data?.runtime} minutes
          </div>
          <hr />
          <div>
            <Button onClick={handleWatchTrailer} variant="outline-danger">
              Watch Trailer
            </Button>
          </div>
          <div className="review_button">
            <Button onClick={handleShowReviews} variant="outline-danger">
              Show Reviews
            </Button>
          </div>
          <div className="rerated_movie_button">
            <Button onClick={handleShowRecommendation} variant="outline-danger">
              Related Movies
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {showReviews &&
            (isReviewLoading ? (
              <div>
                <ClipLoader
                  color={"#123abc"}
                  loading={isReviewLoading}
                  size={150}
                />
              </div>
            ) : isReviewError ? (
              <Alert variant="danger">{reviewError.message}</Alert>
            ) : (
              <div className="reviews_container">
                <h2 className="reviews_header">Reviews:</h2>
                {reviewData?.length > 0 ? (
                  <ul>
                    {reviewData.map((review, index) => (
                      <li className="review_content" key={index}>
                        <h2 className="review-author">
                          author - {review.author}
                        </h2>
                        <p className="review-content">{review.content}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Reviews do not exist.</p>
                )}
              </div>
            ))}
        </Col>

        <Col>
          {showRecommendations &&
            (isRecommendationLoading ? (
              <div>
                <ClipLoader
                  color={"#123abc"}
                  loading={isRecommendationLoading}
                  size={150}
                />
              </div>
            ) : isRecommendationError ? (
              <Alert variant="danger">{recommendationError.message}</Alert>
            ) : (
              <div className="recommendation_container">
                <h2 className="recommendation_header">Related Movies:</h2>
                {recommendationData?.length > 0 ? (
                  <Row className="related_move">
                    {recommendationData.map((movie, index) => (
                      <Col key={index} md={3} xs={6}>
                        <MovieCard
                          className="move-card"
                          movie={movie}
                          onClick={() => navigate(`/movies/${movie.id}`)}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No related movies found.</p>
                )}
              </div>
            ))}
        </Col>
      </Row>

      <Modal show={showTrailer} onHide={handleCloseTrailer} centered>
        <Modal.Header closeButton>
          <Modal.Title>Watch Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerKey ? (
            <YouTube
              videoId={trailerKey}
              opts={{ width: "100%", height: "390px" }}
            />
          ) : (
            <p>No trailer available.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MovieDetail;
