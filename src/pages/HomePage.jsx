import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";

function HomePage() {

  const [topRatedData, setTopRatedData] = useState([]);
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

  return (
    <div>
      <HeaderSlider />
      <h1>Top Rated</h1>
      <div>
        {
          topRatedData.map((top, index) => (
            <p style={{color: 'white'}} key={index} > {top.original_title} </p>
          ))
        }
      </div>
    </div>
  );
}

export default HomePage;
