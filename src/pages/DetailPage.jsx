import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const [creditsData, setCreditsData] = useState(null);
  const [showAllCast, setShowAllCast] = useState(false);
  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${VITE_TMDB_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Film bulunamadı!");
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log("Hata:", err.message);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${VITE_TMDB_KEY}`
    )
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Oyuncu bilgileri alınamadı.");
        }
        return resp.json();
      })
      .then((creditsD) => {
        setCreditsData(creditsD);
      })
      .catch((err) => {
        console.log(err);
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

  const formattedRevenue = movie?.revenue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  }
  )

  return (
    <>
      {movie ? (
        <>
          <div className="detail-container">
            <div className="top-container">
              <div>
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
              </div>

              <div className="top-info-div">
                <div className="votes">
                  <h1 style={{ fontSize: 50 }}>
                    {movie.title || movie.original_title}
                  </h1>
                </div>

                <div className="genres-container">
                  <h2>Genres: </h2>
                  {movie.genres.map((genre, index) => {
                    return (
                      <p style={{ fontSize: 25 }} key={index}>
                        {genre.name}
                      </p>
                    );
                  })}
                </div>

                <div>
                  <h2>Collection</h2>
                  <p>
                    {" "}
                    {movie?.belongs_to_collection?.name
                      ? movie.belongs_to_collection.name
                      : "null"}{" "}
                  </p>
                </div>

                <div>
                  <h2>Popularity</h2>
                  <p> {movie.popularity} </p>
                </div>

                <div>
                  <h2>Revenue</h2>
                  <p>{formattedRevenue}</p>
                </div>

                <div>
                  <div>
                    <p style={{ fontSize: 25, fontWeight: "bold" }}>
                      {" "}
                      Vote Average:{" "}
                    </p>
                    <p className="vote-average">
                      {" "}
                      {movie.vote_average.toFixed(1)}/10{" "}
                      {<FaStar style={{ color: "yellow" }} />}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="info-div">
                <div className="inner-vote-container">
                  <p style={{ fontSize: 30 }}>{movie.overview}</p>
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
                          className="logo-img"
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ margin: 15 }}>
                <h1> Cast </h1>
                <div className="casts">
                  {showAllCast
                    ? creditsData?.cast?.map((cast, index) =>
                        cast.name && cast.profile_path ? (
                          <div className="cast-container" key={index}>
                            <img
                              style={{
                                width: 110,
                                height: 110,
                                borderRadius: 75,
                                borderWidth: 5,
                              }}
                              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                              alt={cast.name}
                            />
                            <p style={{ fontWeight: "bold" }}>{cast.name}</p>
                          </div>
                        ) : null
                      )
                    : creditsData?.cast?.slice(0, 8).map((cast, index) =>
                        cast.name && cast.profile_path ? (
                          <div className="cast-container" key={index}>
                            <img
                              style={{
                                width: 110,
                                height: 110,
                                borderRadius: 75,
                                borderWidth: 5,
                              }}
                              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                              alt={cast.name}
                            />
                            <p style={{ fontWeight: "bold" }}>{cast.name}</p>
                          </div>
                        ) : null
                      )}
                </div>

                <div onClick={() => setShowAllCast(!showAllCast)}>
                  {showAllCast ? (
                    <IoIosArrowUp style={{ color: "aliceblue" }} />
                  ) : (
                    <IoIosArrowDown style={{ color: "aliceblue" }} />
                  )}
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

*/
export default DetailPage;
