import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Hompage/Homepage";
import NotFoundpage from "./pages/NotFoundpage/NotFoundpage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetail";
// 홈페이지
// 영화 전체보여주는 페이지 (서치)
// 영화디테일 페이지
function App() {
  return (
    <div className="body">
      <Routes>
        {/* path="/" 랑 index 랑 같음 */}
          <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="movies" element={<MoviePage />} />
          <Route path="movies/:movie_id" element={<MovieDetailPage />} />
          <Route path="*" element={<NotFoundpage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
