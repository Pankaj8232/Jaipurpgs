import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { themecontext } from "./context/theme";

function Header() {
  const { totalUniqueItems } = useCart();
  const navigate = useNavigate();

  const { theme, settheme } = useContext(themecontext);

  const [popup, openpopup] = useState(false);
  const [search, setSearch] = useState("");
  const [checklogin, setchecklogin] = useState(localStorage.getItem("login"));
  const [data, getdata] = useState([]);

  async function Getdata() {
    let apilink = await fetch("http://localhost:5000/products");
    let result = await apilink.json();
    getdata(result);
  }

  useEffect(() => {
    Getdata();
  }, []);

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [theme]);

  function Changetheme() {
    settheme(theme === "dark" ? "light" : "dark");
  }

  function Popupnav() {
    openpopup(true);
  }

  function Submitpg() {
    toast.error("This service is now unavailable");
  }

  function Filterdata(e) {
    setSearch(e.target.value);
  }

  function Logout() {
    localStorage.removeItem("login");
    setchecklogin(null);
    toast.success("Logout successfully");
  }

  function Profile() {
    navigate("/profile");
  }

  const filter = data.filter((pro) =>
    pro.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="header">
        <div className="logo">
          <span>J</span>
          JaipurStays
        </div>

        <div className="menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>

          <NavLink to="/find" className={({ isActive }) => (isActive ? "active" : "")}>
            Find PG
          </NavLink>

          <NavLink to="/work" className={({ isActive }) => (isActive ? "active" : "")}>
            How It Works
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
            Cart <span className="totaluniqueitem">{totalUniqueItems}</span>
          </NavLink>
        </div>

        <input
          className="searchinput"
          type="text"
          placeholder="Search here"
          value={search}
          onChange={Filterdata}
        />

        <div className="headerbuttons">
          {checklogin ? (
            <>
              <button className="button1" onClick={Profile}>Profile</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="button1">Login</button>
              </Link>

              <Link to="/register">
                <button className="button1">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {search && (
        <div className="searchresults">
          {filter.length > 0 ? (
            filter.map((ele, index) => (
              <Link
                to={`/aboutproductdetails/${ele.slug}`}
                key={ele.id || index}
                onClick={() => setSearch("")}
              >
                <div className="searchitem">
                  <h2 className="searchname">{ele.name}</h2>

                  <h3 className="searchlocation">{ele.location}</h3>

                  <div className="searchimagesarray">
                    <img src={ele.image} alt={ele.name} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="searchitem">
              <h3>No PG found</h3>
            </div>
          )}
        </div>
      )}

      {popup && (
        <div className="popup">
          <i
            className="fas fa-times-circle"
            onClick={() => openpopup(false)}
          ></i>

          <h3 className="popupheading">List Your PG on JaipurStays</h3>

          <p className="popupparagraph">
            Reach more students and working professionals looking for PG
            accommodations in Jaipur. List your property on JaipurStays,
            showcase your rooms and amenities, and get genuine enquiries from
            potential tenants—all in one place.
          </p>

          <button className="button2" onClick={Submitpg}>
            List Your PG
          </button>
        </div>
      )}
    </>
  );
}

export { Header };