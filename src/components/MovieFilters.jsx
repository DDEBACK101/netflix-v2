import { Button, Card, Col, Form, Row } from "react-bootstrap";

const sortOptions = [
  { value: "popularity_desc", label: "Popularity high to low" },
  { value: "popularity_asc", label: "Popularity low to high" },
  { value: "rating_desc", label: "Rating high to low" },
  { value: "rating_asc", label: "Rating low to high" },
  { value: "release_desc", label: "Newest release first" },
  { value: "release_asc", label: "Oldest release first" },
];

const MovieFilters = ({
  keyword,
  genres,
  selectedGenre,
  sortBy,
  onGenreChange,
  onSortChange,
  onReset,
}) => {
  return (
    <Card className="surface-card border-0 h-100">
      <Card.Body className="p-3 p-lg-4">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2 className="h5 fw-bold mb-1">Filters</h2>
            <p className="text-white-50 mb-0">
              {keyword ? "Search results can still be refined by genre." : "Browse with discover filters."}
            </p>
          </div>
          <Button variant="outline-light" size="sm" onClick={onReset}>
            Reset
          </Button>
        </div>

        <Row className="g-3">
          <Col xs={12}>
            <Form.Label className="text-white-50">Sort order</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="filter-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col xs={12}>
            <Form.Label className="text-white-50">Genre</Form.Label>
            <Form.Select
              value={selectedGenre}
              onChange={(event) => onGenreChange(event.target.value)}
              className="filter-select"
            >
              <option value="">All genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MovieFilters;
