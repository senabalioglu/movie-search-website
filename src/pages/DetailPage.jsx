import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${VITE_TMDB_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Film bulunamadı!");
        }
        return res.json(); // JSON parse ediliyor
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log("Hata:", err.message);
      });
  }, [id]);

  return (
    <>
      {movie ? (
        <>
          <div className="detail-container">
            <div className="vote-outline">
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
              />
              <div className="inner-vote-container">
                <h1>{movie.title}</h1>
                <div className="votes">
                  <p style={{ marginRight: 15 }}>{movie.vote_average}</p>
                  <p>{movie.vote_count}</p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: 15}}>
              <p>{movie.overview}</p>
              <div>
                <h2>Genres</h2>
                <div>
                  {movie.genres.map((genre, index) => {
                    return <li key={index}>{genre.name}</li>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </>
  );
}

/*
<div>
        <div style={{ flexDirection: "row" }}>
          
          <div style={{ flex: 1, flexDirection: "row" }}>
            
          </div>
        </div>
      </div>
*/
export default DetailPage;
