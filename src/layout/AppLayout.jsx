import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClapperboard,
  faHeart,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import "./AppLayout.css";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentQuery = params.get("q") || "";
  const [keyword, setKeyword] = useState(currentQuery);
  const [showMenu, setShowMenu] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    setKeyword(currentQuery);
  }, [currentQuery]);

  const favoriteCount = useMemo(() => favorites.length, [favorites.length]);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = keyword.trim();

    if (trimmed) {
      navigate(`/movies?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/movies");
    }

    setShowMenu(false);
  };

  const handleClear = () => {
    setKeyword("");
    navigate("/movies");
  };

  return (
    <div className="app-shell">
      <Navbar expand="lg" fixed="top" className="top-nav">
        <Container fluid="xl">
          <Link className="brand-mark" to="/">
            <span className="brand-badge">N</span>
            <div>
              <strong>NETFLIX V2</strong>
              <div className="brand-copy">movie explorer</div>
            </div>
          </Link>

          <Button
            variant="outline-light"
            className="d-lg-none nav-menu-button"
            onClick={() => setShowMenu(true)}
            aria-label="Open navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>

          <Navbar.Collapse className="d-none d-lg-flex">
            <Nav className="me-auto ms-4 gap-2">
              <NavLink to="/" className="nav-pill">
                Home
              </NavLink>
              <NavLink to="/movies" className="nav-pill">
                Movies
              </NavLink>
              <NavLink to="/favorites" className="nav-pill">
                Favorites
                {favoriteCount > 0 && <Badge bg="danger">{favoriteCount}</Badge>}
              </NavLink>
            </Nav>

            <Form onSubmit={handleSearch} className="nav-search">
              <div className="nav-search-input">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <Form.Control
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Search title, sequel, animation..."
                  aria-label="Search movies"
                />
                {keyword && (
                  <button type="button" className="search-clear" onClick={handleClear}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
              <Button type="submit" variant="danger">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
        className="mobile-drawer"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Browse</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="drawer-links">
            <NavLink to="/" className="drawer-link" onClick={() => setShowMenu(false)}>
              <FontAwesomeIcon icon={faClapperboard} />
              Home
            </NavLink>
            <NavLink to="/movies" className="drawer-link" onClick={() => setShowMenu(false)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              Movies
            </NavLink>
            <NavLink
              to="/favorites"
              className="drawer-link"
              onClick={() => setShowMenu(false)}
            >
              <FontAwesomeIcon icon={faHeart} />
              Favorites
              {favoriteCount > 0 && <Badge bg="danger">{favoriteCount}</Badge>}
            </NavLink>
          </div>

          <Form onSubmit={handleSearch} className="drawer-search">
            <Form.Control
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search movies"
              aria-label="Search movies"
            />
            <div className="d-grid gap-2">
              <Button type="submit" variant="danger">
                Search
              </Button>
              <Button variant="outline-light" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
