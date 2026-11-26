import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footet";
import { Toaster } from "react-hot-toast";

function Locationproducts() {
  const { slug } = useParams();

  const [data, getdata] = useState([]);

  async function Getdata() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app/products");
    let result = await apilink.json();
    getdata(result);
  }

  useEffect(() => {
    Getdata();
  }, []);

  const products = data.filter((item) =>
    item.location?.toLowerCase().startsWith(slug?.toLowerCase() || "")
  );

  return (
    <>
      <Toaster containerStyle={{ zIndex: 20000 }} />

      <Header />

      <main className="location-products-page">
        <div className="location-products-container">

          <div className="location-products-heading">
            <h1>
              {slug ? `${slug} Products` : "Location Products"}
            </h1>

            <p>
              Explore our products available in this location.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="location-products-grid">

              {products.map((ele) => (
                <Link
                  key={ele.id}
                  to={`/aboutproductdetails/${ele.slug}`}
                  className="location-product-card"
                >

                  <div className="location-product-image">
                    <img src={ele.image} alt={ele.name} />
                  </div>

                  <div className="location-product-info">
                    <h2>{ele.name}</h2>

                    <p className="location-product-location">
                      {ele.location}
                    </p>

                    <div className="location-product-bottom">
                      <p className="location-product-price">
                        ₹{ele.price}
                      </p>

                      <button
                        type="button"
                        className="location-product-btn"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                </Link>
              ))}

            </div>
          ) : (
            <div className="no-location-products">
              <h2>No Products Found</h2>

              <p>
                We couldn't find any products available in this location.
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export { Locationproducts };