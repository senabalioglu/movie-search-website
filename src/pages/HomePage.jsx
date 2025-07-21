import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider/HeaderSlider";

function HomePage() {
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
    <div>
      <HeaderSlider />
      <div>
        {headerData?.map((hd, index) => (
          <li key={index} style={{ color: "white" }}>
            {hd.title}
          </li>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
