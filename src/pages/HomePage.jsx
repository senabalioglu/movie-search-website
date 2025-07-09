import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import Card from "../components/Card/Card";

function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";

  const searchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${VITE_TMDB_KEY}&query=${query}`
    );
    const data = await res.json();
    setMovies(data.results);
  };
  return (
    <>
      <div>
        <Input
          onSearch={searchMovies}
          onChangeInput={(e) => setQuery(e.target.value)}
        />
        <h1>Home Page</h1>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.release_date?.split("-")[0]})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomePage;
