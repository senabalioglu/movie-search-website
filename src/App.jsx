import React from "react";
import { Link, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/home">Ana Sayfa</Link> | <Link to="/details">Detay Sayfası</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
