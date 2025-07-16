import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [imgPath, setImgPath] = useState("");
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

  useEffect(() => {
    if (movie?.backdrop_path) {
      const path = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
      document.body.style.backgroundImage = `url(${path})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
      
      return () => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundSize = "";
        document.body.style.backgroundRepeat = "";
        document.body.style.backgroundPosition = "";
      };
    }
  }, [movie]);

  return (
    <>
      {movie ? (
        <>
          <div className="detail-container">
            <div className="top-container">
              <div className="vote-outline">
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
                <div className="inner-vote-container">
                  <h1 style={{ fontSize: 55 }}>
                    {movie.title || movie.original_title}
                  </h1>
                  <div className="votes">
                    <div className="vote">
                      <p style={{ fontSize: 30 }}>{movie.vote_average}</p>
                    </div>
                    <div className="vote">
                      <p style={{ fontSize: 30 }}>{movie.vote_count}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: 15 }}>
                <p style={{ fontSize: 30 }}>{movie.overview}</p>
                <div className="info-div">
                  <div>
                    <h2>Genres</h2>
                    {movie.genres.map((genre, index) => {
                      return (
                        <li style={{ fontSize: 25 }} key={index}>
                          {genre.name}
                        </li>
                      );
                    })}
                  </div>
                  <div>
                    <h2>Collection</h2>
                    <h3>
                      {" "}
                      {movie?.belongs_to_collection?.name
                        ? movie.belongs_to_collection.name
                        : "null"}{" "}
                    </h3>
                  </div>
                  <div>
                    <h2>Popularity</h2>
                    <h3> {movie.popularity} </h3>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ margin: 15 }}>
              <h1>Production Companies</h1>
              <div className="companies">
                {movie.production_companies.map((company, index) => (
                  <div key={index} className="company">
                    <p>{company.name}</p>
                    {company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      />
                    )}
                  </div>
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
