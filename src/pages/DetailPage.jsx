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
            <div className="top-container">
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

              <div style={{ marginLeft: 15 }}>
                <p>{movie.overview}</p>
                <div className="info-div">
                  <div>
                    <h2>Genres</h2>
                    {movie.genres.map((genre, index) => {
                      return <li key={index}>{genre.name}</li>;
                    })}
                  </div>
                  <div>
                    <h2>Collection</h2>
                    <h4> {movie.belongs_to_collection.name} </h4>
                  </div>
                  <div>
                    <h2>Popularity</h2>
                    <h4> {movie.popularity} </h4>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h1>Production Companies</h1>
              <div className="companies">
                {movie.production_companies.map((companies, index) => (
                  <>
                    <div>
                      <p> {companies.name} </p>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${companies.logo_path}`}
                      />
                    </div>
                  </>
                ))}
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

*/
export default DetailPage;
