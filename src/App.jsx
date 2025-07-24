import { Outlet, useNavigate } from "react-router-dom";
import Input from "./components/Input/Input";
import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="app-container">
      <Input
        className="search-input-div"
        onChangeInput={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
      />
      <Outlet />
    </div>
  );
}
