import { useState, useEffect, useContext, createContext } from "react";

const MovieContext = createContext();

export const useMoviecontext = () => useContext(MovieContext);

export const Movieprovider = ({ children }) => {
  const [favorites, SetFavorites] = useState([]);

  useEffect(() => {
    const storedfavs = localStorage.getItem("favorites");
    if (storedfavs) SetFavorites(JSON.parse(storedfavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const Addtofavorites = (movie) => {
    SetFavorites(prev => [...prev, movie]);
  };

  const removefavorites = (movieid) => {
    SetFavorites(prev => prev.filter(movie => movie.id !== movieid));
  };

  const isfavorite = (movieid) => {
    return favorites.some(movie => movie.id === movieid);
  };

  const value = {
    favorites,
    Addtofavorites,
    removefavorites,
    isfavorite
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
