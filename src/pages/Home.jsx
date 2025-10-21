import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { SearchMovies, getPopularMovies } from "../server/api";

export default function Home() {
  const [SearchQuery, SetSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, SetError] = useState(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        SetError('Failed to load movies.');
      } finally {
        SetLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!SearchQuery.trim()) return;
    if (loading) return;

    SetLoading(true);
    try {
      const searchResults = await SearchMovies(SearchQuery);
      setMovies(searchResults);
      SetError(null);
    } catch (err) {
      console.log(err);
      SetError('Failed to search movies');
    } finally {
      SetLoading(false);
    }

    SetSearchQuery('');
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search_form">
        <input
          type="text"
          placeholder="Search For Movies.."
          className="search-input"
          value={SearchQuery}
          onChange={(e) => SetSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
