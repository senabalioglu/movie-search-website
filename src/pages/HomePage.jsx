import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import ScrollableSection from "../components/ScrollableSection/ScrollableSection";

function HomePage() {
  const [topRatedData, setTopRatedData] = useState([]);
  const [popularData, setPopularData] = useState([]);
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

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${VITE_TMDB_KEY}`)
      .then((response) => {
        if (!response.ok) {
          console.log("Hata");
        }
        return response.json();
      })
      .then((data) => {
        setPopularData(data.results);
      })
      .catch((err) => <h1>Error {err} </h1>);
  });

  const goToDetail = (top) => {
    navigate(`/details/${top.id}`);
  };

  return (
    <div>
      <HeaderSlider />
      <h1 style={{ margin: 10 }}>Top Rated</h1>

      <div className="top-rated-container">
        {topRatedData.map((top) => (
          <ScrollableSection
            key={top.id}
            onClickFunc={() => goToDetail(top)}
            compKey={top.id}
            posterPath={top.poster_path}
            formattedTitle={
              top.title.length < 25 ? top.title : top.title.slice(0, 20) + "..."
            }
            date={top.release_date?.split("-")[0]}
          />
        ))}
      </div>
      <h1 style={{ margin: 10 }}>Popular</h1>

      <div className="top-rated-container">
        {popularData.map((popular) => (
          <ScrollableSection
            key={popular.id}
            onClickFunc={() => goToDetail(popular)}
            compKey={popular.id}
            posterPath={popular.poster_path}
            formattedTitle={
              popular.title.length < 25
                ? popular.title
                : popular.title.slice(0, 20) + "..."
            }
            date={popular.release_date?.split("-")[0]}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

/*
{ navFunc, title, movieDate, cardImg, className }
*/
