import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";

function HomePage() {
  const [topRatedData, setTopRatedData] = useState([]);
  const navigate = useNavigate();
  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${VITE_TMDB_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Film bulunamadı!");
        }
        return res.json();
      })
      .then((data) => {
        setTopRatedData(data.results);
      })
      .catch((err) => {
        return <p> Hata: {err} </p>;
      });
  }, []);

  console.log(topRatedData);

  const goToDetail = (top) => {
    navigate(`/details/${top.id}`);
  };

  return (
    <div>
      <HeaderSlider />
      <h1>Top Rated</h1>
      <div className="top-rated-container" >
        {topRatedData.map((top) => (
          <div className="top-rated-card" key={top.id} onClick={() => goToDetail(top)} >
            <div >
              <img
            src={`https://image.tmdb.org/t/p/w300${top.poster_path}`}
            />
            <div>
              <h3 style={{ color: "aliceblue" }}>
                {top.title.length < 25
                  ? top.title
                  : top.title.slice(0, 20) + "..."}
              </h3>
              <p style={{ color: "aliceblue" }}>
                {top.release_date?.split("-")[0]}
              </p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

/*
{ navFunc, title, movieDate, cardImg, className }
*/
