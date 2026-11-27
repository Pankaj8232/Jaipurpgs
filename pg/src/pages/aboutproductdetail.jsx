
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "react-use-cart";

function Aboutprodcutdetail() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { addItem, inCart } = useCart();

  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  async function Getapi() {
    try {
      let apilink = await fetch("https://pgbackend-umber.vercel.app/products");
      let result = await apilink.json();

      let product = result.find((ele) => ele.slug === slug);

      if (product) {
        product.id = product._id;
      }

      setdata(product || null);
    } catch (error) {
      console.log(error);
      setdata(null);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    setloading(true);
    Getapi();
  }, [slug]);

  function Addcart() {
    const checklogin = localStorage.getItem("login");

    if (checklogin === "yes") {
      addItem(data);
      toast.success("PG Added To Cart");
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  }

  if (loading) {
    return (
      <div className="pgloader">
        <div className="pgloadercontent">
          <div className="pgloaderanimation">
            <div className="loadercircle"></div>
            <i className="fas fa-house"></i>
          </div>

          <h2>Finding Your Perfect PG</h2>
          <p>Please wait while we load the details...</p>

          <div className="loaderprogress">
            <div className="loaderprogressbar"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <>
      <Toaster containerStyle={{ zIndex: 20000 }} />

      <div className="aboutproductdetail">
        <div className="aboutproducttop">
          <div className="aboutdetailsproductimg">
            <img src={data.image} alt={data.name} />

            <div className="smallimagesmaindiv">
              <div className="smallimage1">
                <img src={data.smallimage1} alt="" />
              </div>

              <div className="smallimage2">
                <img src={data.smallimage2} alt="" />
              </div>

              <div className="smallimage3">
                <img src={data.smallimage3} alt="" />
              </div>

              <div className="smallimage4">
                <img src={data.smallimage4} alt="" />
              </div>
            </div>
          </div>

          <div className="aboutproductinfo">
            <h1>{data.name}</h1>

            <p className="aboutproductdetailslocation">
              📍 {data.location}
            </p>

            <div className="aboutproductdetails">
              <div>
                <span>Price</span>
                <strong>₹{data.price}</strong>
              </div>

              <div>
                <span>Available</span>
                <strong>{data.available}</strong>
              </div>

              <div>
                <span>Gender</span>
                <strong>{data.gender}</strong>
              </div>
            </div>

            <div className="aboutbookingbox">
              {inCart(data.id) ? (
                <Link to="/cart">Go to cart</Link>
              ) : (
                <button className="addcart" onClick={Addcart}>
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="aboutproductdescription">
          <h2>About this PG</h2>

          <p>
            Find comfortable and affordable accommodation with convenient
            facilities and a great location.
          </p>
        </div>
      </div>

      <div className="aboutproductbelow">
        <div className="aboutproductbelowheading">
          <h2>Why Choose This PG?</h2>
          <p>Everything you need for a comfortable and convenient stay.</p>
        </div>

        <div className="aboutproductfeatures">
          <div className="aboutproductfeature">
            <i className="fas fa-wifi"></i>
            <h3>High Speed Wi-Fi</h3>
            <p>
              Enjoy fast and reliable internet connectivity for study, work,
              and entertainment.
            </p>
          </div>

          <div className="aboutproductfeature">
            <i className="fas fa-bed"></i>
            <h3>Comfortable Rooms</h3>
            <p>
              Clean, spacious, and comfortable rooms designed for a peaceful
              stay.
            </p>
          </div>

          <div className="aboutproductfeature">
            <i className="fas fa-shield-halved"></i>
            <h3>Safe & Secure</h3>
            <p>
              A secure environment with proper safety arrangements for
              residents.
            </p>
          </div>

          <div className="aboutproductfeature">
            <i className="fas fa-utensils"></i>
            <h3>Food Facility</h3>
            <p>
              Fresh and hygienic meals are available with convenient food
              facilities.
            </p>
          </div>

          <div className="aboutproductfeature">
            <i className="fas fa-broom"></i>
            <h3>Clean Environment</h3>
            <p>
              Regular cleaning and maintenance to keep the property fresh and
              hygienic.
            </p>
          </div>

          <div className="aboutproductfeature">
            <i className="fas fa-location-dot"></i>
            <h3>Great Location</h3>
            <p>
              Conveniently located near important places, transport, markets,
              and other facilities.
            </p>
          </div>
        </div>

        <div className="aboutproductfacilities">
          <h2>PG Facilities</h2>

          <div className="facilitylist">
            <span>
              <i className="fas fa-check"></i> Wi-Fi
            </span>

            <span>
              <i className="fas fa-check"></i> Power Backup
            </span>

            <span>
              <i className="fas fa-check"></i> Parking
            </span>

            <span>
              <i className="fas fa-check"></i> Housekeeping
            </span>

            <span>
              <i className="fas fa-check"></i> CCTV Security
            </span>

            <span>
              <i className="fas fa-check"></i> 24/7 Water Supply
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export { Aboutprodcutdetail };
