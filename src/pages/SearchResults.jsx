import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from '../components/Card/Card'

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";

  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${VITE_TMDB_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("API fetch error:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  const goToDetail = (movie) => {
    navigate(`/details/${movie.id}`);
  };

  return (
    <div>
      <h2>Arama Sonuçları: "{query}"</h2>
      <div className="container" >
          {movies.map((movie) => (
            movie.backdrop_path !== null ?
             <Card
              className={"detail-button"}
              navFunc={() => goToDetail(movie)}
              itemId = {movie.id}
              cardImg={movie.poster_path}
              key={movie.id}
              title={movie.title}
              movieDate={movie.release_date?.split("-")[0]}
            /> :
            <></>
          ))}
        </div>
    </div>
  );
}
