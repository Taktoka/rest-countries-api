import React, { memo, useRef } from "react";
import "./homepage.css";

import { useState } from "react";
import CustomData from "../CustomData";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [hndleClick, data] = CustomData();
  const [newData, setNewData] = useState([]);
  const [result, setResult] = useState([]);

  const inputRef = useRef();
  const iconsRef = useRef([]);
  const ulRef = useRef();
  const iconsRefs = iconsRef.current;
  const listRefs = useRef([]);

  const navigate = useNavigate();

  localStorage.setItem("data", JSON.stringify(data));

  const UiPage = (arry) =>
    arry.map((item) => {
      return (
        <div
          className="box"
          key={Math.random()}
          onClick={() => chosenCountry(item)}
        >
          <img src={item.flags.png} className="flag" />
          <div className="info">
            <h3>{item.name}</h3>
            <p>
              Population: <span>{item.population}</span>
            </p>
            <p>
              Region: <span>{item.region}</span>
            </p>
            <p>
              Capital: <span>{item.capital}</span>
            </p>
          </div>
        </div>
      );
    });

  let country = {};

  const chosenCountry = (item) => {
    country = {
      name: item.name,

      flag: item.flags.png,

      nativeName: item.nativeName,

      population: item.population,

      region: item.region,

      SubRegion: item.subregion,

      capital: item.capital,

      topLevelDomain: item.topLevelDomain,

      currencies: item.currencies,

      languages: item.languages,

      borders: item.borders,
    };

    console.log(country);
    localStorage.setItem("country", JSON.stringify(country));
    navigate("/details");
  };

  const searchInput = (e) => {
    e.preventDefault();

    const searchResult = data.filter(
      (el) => el.name.indexOf(inputRef.current.value) !== -1
    );

    setResult((result) => searchResult);

    console.log(result);
  };

  const filter = (ref) => {
    const newDataarry = data.filter(
      (el) => el.region.indexOf(ref.innerText) !== -1
    );
    setNewData(newDataarry);
    ulRef.current.classList.remove("clicked");
  };

  return (
    <div className="homepage">
      <nav>
        <form>
          <i className="fa-solid fa-magnifying-glass search"></i>
          <input
            type="text"
            placeholder="Search for a country.."
            ref={inputRef}
            onChange={searchInput}
          />
        </form>
        <div className="filter">
          <button>
            {" "}
            Filter by Region
            <i
              className="fa-solid fa-angle-up hide"
              ref={(el) => (iconsRefs[0] = el)}
              onClick={() => hndleClick(iconsRefs[0], iconsRefs[1], ulRef)}
            ></i>
            <i
              className="fa-solid fa-angle-down"
              ref={(el) => (iconsRefs[1] = el)}
              onClick={() => hndleClick(iconsRefs[1], iconsRefs[0], ulRef)}
            ></i>
          </button>

          <ul className="filter-list" ref={ulRef}>
            <li
              className="africe"
              ref={(el) => (listRefs.current[0] = el)}
              onClick={(ref) => filter(listRefs.current[0])}
            >
              Africa
            </li>
            <li
              className="america"
              ref={(el) => (listRefs.current[1] = el)}
              onClick={(ref) => filter(listRefs.current[1])}
            >
              America
            </li>
            <li
              className="asia"
              ref={(el) => (listRefs.current[2] = el)}
              onClick={(ref) => filter(listRefs.current[2])}
            >
              Asia
            </li>
            <li
              className="europa"
              ref={(el) => (listRefs.current[3] = el)}
              onClick={(ref) => filter(listRefs.current[3])}
            >
              Europe
            </li>
            <li
              className="oceania"
              ref={(el) => (listRefs.current[4] = el)}
              onClick={(ref) => filter(listRefs.current[4])}
            >
              Oceania
            </li>
          </ul>
        </div>
      </nav>
      <section className="main-home">
        {newData.length
          ? UiPage(newData)
          : result.length
          ? UiPage(result)
          : UiPage(data)}
      </section>
    </div>
  );
}
export default memo(HomePage);
