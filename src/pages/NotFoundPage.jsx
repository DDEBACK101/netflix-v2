import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid="xl" className="py-5">
      <div className="surface-card p-4 p-lg-5 text-center">
        <h1 className="fw-bold mb-3">Page not found</h1>
        <p className="text-white-50 mb-4">
          The page you tried to open does not exist in this preview build.
        </p>
        <Button variant="danger" onClick={() => navigate("/")}>
          Go home
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
