import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Filter() {
  const [data, getdata] = useState([]);
  const [filterdata, getfilterdata] = useState([]);

  const [location, setlocation] = useState("");
  const [price, setprice] = useState("");
  const [gender, setgender] = useState("");
  const [popup, setpopup] = useState(false);

  async function Getdata() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app//products");
    let result = await apilink.json();

    getdata(result);
    getfilterdata(result);
  }

  useEffect(function () {
    Getdata();
  }, []);

  function Searchpg() {
    let result = data.filter(function (pg) {
      if (location !== "") {
        if (pg.location.includes(location) === false) {
          return false;
        }
      }

      if (price !== "") {
        if (Number(pg.price) > Number(price)) {
          return false;
        }
      }

      if (gender !== "") {
        if (gender !== "both") {
          if (pg.gender !== gender) {
            return false;
          }
        }
      }

      return true;
    });

    getfilterdata(result);
    setpopup(true);
  }

  function Resetpg() {
    setlocation("");
    setprice("");
    setgender("");
    getfilterdata(data);
    setpopup(false);
  }

  return (
    <>
      <div className="banner2">
        <div className="banner2content">
          <h2>Find Your Perfect PG</h2>

          <p>
            Search comfortable and affordable PGs near your college or workplace.
          </p>

          <div className="searchbox">
            <select
              value={location}
              onChange={function (e) {
                setlocation(e.target.value);
              }}
            >
              <option value="">All Locations</option>
              <option value="Jhotwara">Jhotwara</option>
              <option value="Mansarovar">Mansarovar</option>
              <option value="Vaishali">Vaishali</option>
              <option value="Gopalpura">Gopalpura</option>
            </select>

            <select
              value={price}
              onChange={function (e) {
                setprice(e.target.value);
              }}
            >
              <option value="">All Prices</option>
              <option value="5000">Up to ₹5,000</option>
              <option value="6000">Up to ₹6,000</option>
              <option value="7000">Up to ₹7,000</option>
              <option value="8000">Up to ₹8,000</option>
              <option value="9000">Up to ₹9,000</option>
              <option value="10000">Up to ₹10,000</option>
            </select>

            <select
              value={gender}
              onChange={function (e) {
                setgender(e.target.value);
              }}
            >
              <option value="">All PG Types</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="both">Both</option>
            </select>

            <button onClick={Searchpg}>Search PG</button>
            <button onClick={Resetpg}>Reset</button>
          </div>
        </div>
      </div>

      {popup === true && (
        <div className="pgpopup">
          <div className="pgpopupcontent">
            <button
              className="pgpopupclose"
              onClick={function () {
                setpopup(false);
              }}
            >
              X
            </button>

            <h2 className="pgpopupheading">
              Available PGs: {filterdata.length}
            </h2>

            {filterdata.length > 0 ? (
              <div className="pgcards">
                {filterdata.map(function (pg) {
                  return (
                    <Link
                      key={pg.id}
                      to={`/aboutproductdetails/${pg.slug}`}
                      className="pgcard"
                    >
                      <img src={pg.image} alt={pg.name} />

                      <div className="pgcarddetails">
                        <h3>{pg.name}</h3>
                        <p>Location: {pg.location}</p>
                        <p>Price: ₹{pg.price}</p>
                        <p>Gender: {pg.gender}</p>
                        <p>Available Rooms: {pg.available}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="nopgfound">No PGs found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export { Filter };