import React, { memo } from "react";
import "./details.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import CustomData from "../CustomData";

function DetailsComp() {
  const [hndleClick, data] = CustomData();
  const [country, setCountry] = useState({});

  useEffect(() => {
    if (localStorage.getItem("country")) {
      setCountry((country) => JSON.parse(localStorage.getItem("country")));
    }
  }, []);

  console.log(country);

  const borderCountry = (e) => {
    const borderCountry = data.find(
      (el) => el.alpha3Code === e.target.innerText
    );
    console.log(borderCountry);
    localStorage.setItem("borders", JSON.stringify(borderCountry));
    borderCountry &&
      setCountry((country) => JSON.parse(localStorage.getItem("borders")));
  };

  return (
    <div className="details">
      <button className="back">
        <i className="fa-solid fa-arrow-left"></i>{" "}
        <NavLink to="/">Back</NavLink>{" "}
      </button>
      <div className="country">
        {" "}
        <div className="img">
          <img src={country.flag} />
        </div>
        <div className="data">
          {" "}
          <h1>{country.name}</h1>
          <div className="info">
            <div>
              {" "}
              <p>
                Native Name: <span>{country.nativeName}</span>
              </p>
              <p>
                Population: <span>{country.population}</span>
              </p>
              <p>
                Region: <span>{country.region}</span>
              </p>
              <p>
                Sub Region: <span>{country.subregion}</span>
              </p>
              <p>
                Capital: <span>{country.capital}</span>
              </p>
            </div>
            <div>
              {" "}
              <p>
                Top Level Domain: <span>{country.topLevelDomain}</span>
              </p>
              <p>
                Currencies:
                <span>
                  {country.currencies &&
                    country.currencies.map((el) => (
                      <span key={Math.random()}>{el.code}</span>
                    ))}
                </span>
              </p>
              <p>
                Languages:
                {country.languages &&
                  country.languages.map((el) => (
                    <span key={Math.random()}>{el.name}</span>
                  ))}
              </p>
            </div>
          </div>
          <div className="borders">
            <p> Border Countries:</p>
            <ul>
              {country.borders &&
                country.borders.map((el) => {
                  return (
                    <li key={Math.random()} onClick={(e) => borderCountry(e)}>
                      <NavLink to="/details">{el}</NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(DetailsComp);
