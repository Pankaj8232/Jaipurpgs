
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Featurearray() {
  const [products, allproducts] = useState([]);
  const [loading, setloading] = useState(true);

  async function Getapi() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app/products");
    let data = await apilink.json();

    allproducts(data);
    setloading(false);
  }

  useEffect(() => {
    Getapi();
  }, []);

  if (loading) {
    return (
      <div className="pgloader">
        <div className="pgloadercontent">
          <div className="pgloaderanimation">
            <div className="loadercircle"></div>
            <i className="fas fa-house"></i>
          </div>

          <h2>Finding Perfect PG</h2>
          <p>Please wait while we load the details...</p>

          <div className="loaderprogress">
            <div className="loaderprogressbar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="procutsarray">
      {products.map((ele) => (
        <Link
          key={ele._id}
          to={`/aboutproductdetails/${ele.slug}`}
          className="product"
        >
          <h2 className="pgname">{ele.name}</h2>

          <h3 className="pglocation">{ele.location}</h3>

          <div className="pgimagesarray">
            <img src={ele.image} alt={ele.name} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export { Featurearray };
