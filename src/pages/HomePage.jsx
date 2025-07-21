import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { query } = useOutletContext();
  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const searchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${VITE_TMDB_KEY}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    };

    searchMovies();
  }, [query]);

  const goToDetail = (movie) => {
    navigate(`/details/${movie.id}`);
  };

  return (
    <>
      <HeaderSlider />
      <div className="container">
        {movies.map((movie) =>
          movie.backdrop_path ? (
            <Card
              className={"detail-button"}
              navFunc={() => goToDetail(movie)}
              itemId={movie.id}
              cardImg={movie.poster_path}
              key={movie.id}
              title={movie.title}
              movieDate={movie.release_date?.split("-")[0]}
            />
          ) : null
        )}
      </div>
    </>
  );
}

export default HomePage;
