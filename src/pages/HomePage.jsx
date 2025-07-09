import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import Card from "../components/Card/Card";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Input />
        <h1>Home Page</h1>
        <Card navFunc={() => navigate("/details")} />
      </div>
    </>
  );
}

export default HomePage;
