import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import DetailsComp from "./components/Details/DetailsComp";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CustomData from "./components/CustomData";

function App() {
  const [hndleClick] = CustomData();

  const modeRefs = useRef([]);
  const mainRef = useRef();
  const modeEle = modeRefs.current;

  return (
    <BrowserRouter>
      <div className="App" ref={mainRef}>
        <header className="App-header">
          <h1>
            <NavLink to="/">Where in the world?</NavLink>
          </h1>
          <div
            className="dark mode"
            ref={(el) => (modeEle[0] = el)}
            onClick={() => hndleClick(modeEle[0], modeEle[1], mainRef)}
          >
            <i className="fa-regular fa-moon"></i>
            <p>Dark Mode</p>
          </div>
          <div
            className=" light mode hide"
            ref={(el) => (modeEle[1] = el)}
            onClick={() => hndleClick(modeEle[1], modeEle[0], mainRef)}
          >
            <i className="fa-regular fa-sun"></i>
            <p>Light Mode</p>
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details" element={<DetailsComp />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
