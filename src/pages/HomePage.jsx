import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import Card from "../components/Card/Card";
import DetailPage from "./DetailPage";

function HomePage() {

  let mouseCursor = document.querySelector('.cursor');
  let navInput = document.querySelectorAll('.search-input-div');
  let navButton = document.querySelectorAll('.detail-button');

  window.addEventListener('mousemove', cursor);

  function cursor(e){
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
  }

  navInput.forEach(input => {
    input.addEventListener('mouseleave', () => {
      mouseCursor.classList.remove("input-grow");
    });
    input.addEventListener('mouseover', () => {
      mouseCursor.classList.add("input-grow");
    });
  });

  navButton.forEach(buttons => {
    buttons.addEventListener('mouseleave', () => {
      mouseCursor.classList.remove("input-grow");
    });
    buttons.addEventListener('mouseover', () => {
      mouseCursor.classList.add("input-grow");
    });
  });

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

  const goToDetail = (movie) => {
    navigate(`/details/${movie.id}`);
  }

  return (
    <>
    
      <div>
        <div className="cursor" ></div>
        <Input
          className={"search-input-div"}
          onSearch={searchMovies}
          onChangeInput={(e) => setQuery(e.target.value)}
        />
        
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
    </>
  );
}

export default HomePage;
