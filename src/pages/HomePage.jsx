import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Input />
        <h1>Home Page</h1>
        <div>
          <h3>Örnek Bileşen</h3>
          <button onClick={() => navigate("/details")}>Detaylara Git</button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
