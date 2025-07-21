import "../HeaderSlider/HeaderSlider.css";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

function HeaderSlider() {
  const [headerData, setHeaderData] = useState([]);
  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${VITE_TMDB_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Film bulunamadı!");
        }
        return res.json();
      })
      .then((data) => {
        setHeaderData(data.results);
      })
      .catch((error) => {
        return <p> Hata: {error} </p>;
      });
  }, []);

  return (
    <>
      {headerData?.map((hd, index) => (
        <>
          <div className="slider-container">
            <div>
              <img
                className="header-img"
                src={`https://image.tmdb.org/t/p/original${hd.backdrop_path}`}
              />
            </div>
            <div>
              <h2 key={index} style={{ color: "white" }}>
                {hd.title}
              </h2>
              <p>
                {hd.overview.length < 150
                  ? hd.overview
                  : hd.overview.slice(0, 150) + "..."}
              </p>
              <p>
                {" "}
                {hd.vote_average.toFixed(1)}/10{" "}
                {<FaStar style={{ color: "yellow" }} />}{" "}
              </p>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

//{title.length < 25 ? title : title.slice(0, 20) + "..."}

export default HeaderSlider;
