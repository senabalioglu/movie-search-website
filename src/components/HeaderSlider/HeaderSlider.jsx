import "../HeaderSlider/HeaderSlider.css";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function HeaderSlider() {
  const [headerData, setHeaderData] = useState([]);
  const VITE_TMDB_KEY = "4809431e976e960f71c692b27469b8d2";
  const [headerIndex, setHeaderIndex] = useState(1);
  const [error, setError] = useState(null);

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
      .catch((err) => {
        return <p> Hata: {err} </p>;
      });
  }, []);
  

  const handleNext = () => {
    setHeaderIndex((prev) => (prev + 1) % headerData.length);
  };

  const handlePrev = () => {
    setHeaderIndex(
      (prev) => (prev - 1 + headerData.length) % headerData.length
    );
  };

  if (error) {
    return <p style={{ color: "red" }}>Hata: {error}</p>;
  }

  if (!headerData.length) {
    return <p>Yükleniyor...</p>;
  }

  const hd = headerData[headerIndex];

  return (
    <div className="slider-container" key={hd.id}>
      <div className="slider-image-container">
        {headerIndex > 0 && (
          <div className="arrow arrow-left">
            <IoIosArrowBack onClick={handlePrev} />
          </div>
        )}
        <img
          className="header-img"
          src={`https://image.tmdb.org/t/p/original${hd.backdrop_path}`}
          alt={hd.title}
        />
        {headerIndex < headerData.length - 1 && (
          <div className="arrow arrow-right">
            <IoIosArrowForward onClick={handleNext} />
          </div>
        )}
      </div>

      <div className="slider-text">
        <h2 style={{ color: "white" }}>{hd.title}</h2>
        <p>{hd.overview.length < 250 ? hd.overview : hd.overview.slice(0, 100) + "..."}</p>
        <p style={{ color: "white" }}>
          {hd.vote_average.toFixed(1)} / 10{" "}
          <FaStar style={{ color: "yellow" }} />
        </p>
      </div>
    </div>
  );
}

export default HeaderSlider;
