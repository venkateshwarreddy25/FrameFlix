import { useMoviecontext } from "../Context/MovieContext";
import MovieCard from "../components/MovieCard";

export default function Favorite() {
  const { favorites } = useMoviecontext();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <p>No Favorite Movies Yet</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="movies-grid">
        {favorites.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
