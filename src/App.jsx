import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Input from "./components/Input/Input";

export default function App() {
  const [query, setQuery] = useState("");
  
  // Mouse cursor hareketleri burada kalabilir
  useEffect(() => {
    const mouseCursor = document.querySelector('.cursor');
    const navInput = document.querySelectorAll('.search-input-div');
    const navButton = document.querySelectorAll('.detail-button');

    function cursor(e) {
      mouseCursor.style.top = e.pageY + 'px';
      mouseCursor.style.left = e.pageX + 'px';
    }

    window.addEventListener('mousemove', cursor);

    navInput.forEach(input => {
      input.addEventListener('mouseleave', () => {
        mouseCursor.classList.remove("input-grow");
      });
      input.addEventListener('mouseover', () => {
        mouseCursor.classList.add("input-grow");
      });
    });

    navButton.forEach(button => {
      button.addEventListener('mouseleave', () => {
        mouseCursor.classList.remove("input-grow");
      });
      button.addEventListener('mouseover', () => {
        mouseCursor.classList.add("input-grow");
      });
    });

    return () => {
      window.removeEventListener('mousemove', cursor);
    };
  }, []);

  return (
    <div>
      <div className="cursor"></div>
      <Input
        className={"search-input-div"}
        onChangeInput={(e) => setQuery(e.target.value)}
      />
      <Outlet context={{ query }} />
    </div>
  );
}
