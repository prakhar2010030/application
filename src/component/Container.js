import React, { useEffect, useState } from "react";
import { WiMoonAltNew } from "react-icons/wi";
import "./container.css";

export default function Container() {
  const [city, setCity] = useState(null);

  const [weatherdata, setWeatherdata] = useState("lucknow");
  const [type, setType] = useState("k");
  const [country, setCountry] = useState("k");
  const [place, setPlace] = useState("l");
  // running

  useEffect(() => {
    var getData = async () => {
      const api_key = "d9bca355a8e5d0c5a45c98825d742d60";
      var url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherdata}&units=metric&appid=${api_key}`;

    //   axios
    //     .post(url)
    //     .then((data) => console.log(data.data))
    //     .catch((err) => console.log(err));
        var data = await fetch(url);
        var parsedata = await data.json();

      console.log(parsedata);

      setCity(parsedata.main);
    };
    getData();
  }, [weatherdata]);

    useEffect(() => {
      const getData = async () => {
        const api_key = "d9bca355a8e5d0c5a45c98825d742d60";
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherdata}&units=metric&appid=${api_key}`;

        var result = await fetch(url);
        var data = await result.json();

        // console.log(data);

        setType(data.weather[0]);
        setPlace(data);

        setCountry(data.sys);
      };
      getData();
    }, [weatherdata]);

  const handleonchange = (event) => {
    setWeatherdata(event.target.value);
  };

  //Button for dark mode

  const [mystyle, setmystyle] = useState({
    color: "black",
    backgroundColor: "rgb(60, 171, 162)",
  });

  const [btncont, setBtnCont] = useState({
    color: "black",
  });

  const enable = () => {
    if (mystyle.color === "white") {
      setmystyle({
        color: "black",
        backgroundColor: "rgb(60, 171, 162)",
      });
      setBtnCont({
        color: "black",
        backgroundColor: "white",
      });
    } else {
      setmystyle({
        color: "white",
        backgroundColor: "#383838",
      });
      setBtnCont({
        Color: "white",
        backgroundColor: "gray",
      });
    }
  };

  return (
    <div>
      <button onClick={enable} className="darkmode" style={btncont}>
        <WiMoonAltNew />
      </button>
      <div className="main">
        <div className="weathercontainer " style={mystyle}>
          <div className="location">
            <h3>{weatherdata}</h3>
          </div>
        </div>

        <div className="weatherdetails" style={mystyle}>
          <h1>Weather Details</h1>
          <input
            type="search"
            onChange={handleonchange}
            value={weatherdata}
            placeholder="| Enter city...."
          />
          {!city ? (
            <p>city not found</p>
          ) : (
            <div className="para" style={mystyle}>
              <p className="paragraph">
                Place:<span>{place.name}</span>
              </p>
              <hr />
              <p className="paragraph">
                Temperature(C):<span>{city.temp}</span>
              </p>
              <hr />
              <p className="paragraph">
                Humidity:<span>{city.humidity}</span>
              </p>
              <hr />
              <p className="paragraph">
                Pressure:<span>{city.pressure}</span>{" "}
              </p>
              <hr />
              <p className="paragraph">
                Weather_type:<span>{type.main}</span>
              </p>
              <hr />
              <p className="paragraph">
                Country:<span>{country.country}</span>
              </p>
              <hr />
            </div>
          )}
        </div>

        <div className=" clear"></div>
      </div>
    </div>
  );
}
