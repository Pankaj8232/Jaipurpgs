import React from "react";
import { useCart } from "react-use-cart";
import { Header } from "../header";
import { Footer } from "../footet";
import toast, { Toaster } from "react-hot-toast";
import { Bookseats } from "../featureproductsarray/bookseats";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const {
    items,
    removeItem,
    isEmpty,
    cartTotal,
    totalUniqueItems,
    totalItems,
    updateItemQuantity,
  } = useCart();

  
  function Bookpg() {
  navigate("/qrcodecart");
}


  const navigate = useNavigate();

  function Logincheckcart() {
    navigate("/login");
  }

  const checklogin = localStorage.getItem("login");

  if (checklogin === "yes") {
    if (isEmpty) {
      return (
        <>
          <Header />

          <Toaster containerStyle={{ zIndex: 20000 }} />

          <main className="cart-empty-page">
            <div className="cart-empty-box">
              <div className="cart-empty-icon">
                <i className="fas fa-cart-shopping"></i>
              </div>

              <h1 className="emptycartheading">Your cart is empty</h1>

              <p className="emptycartparagraph">
                Looks like you haven't added any PG to your cart yet.
              </p>
            </div>
          </main>

          <Footer />
        </>
      );
    }

    return (
      <>
        <Toaster position="top-right" containerStyle={{ zIndex: 20000 }} />

        <Header />

        <main className="real-cart">
          <div className="cart-container">
            <div className="cart-page-heading">
              <div>
                <span className="cart-small-heading">YOUR BOOKING</span>

                <h1>My Cart</h1>

                <p>Review your selected PGs before completing your booking.</p>
              </div>

              <div className="cart-items-count">
                <i className="fas fa-cart-shopping"></i>
                <span>
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </span>
              </div>
            </div>

            <div className="cart-main-layout">
              <section className="cart-products-section">
                <div className="cart-products-header">
                  <div>
                    <h2>Selected PGs</h2>
                    <p>
                      {totalUniqueItems} {totalUniqueItems === 1 ? "PG" : "PGs"}{" "}
                      selected
                    </p>
                  </div>
                </div>

                <div className="cart-products">
                  {items.map((ele) => (
                    <article className="real-cart-card" key={ele.id}>
                      <div className="cart-card-image">
                        <img src={ele.image} alt={ele.name} />

                        <span className="cart-image-badge">
                          <i className="fas fa-check"></i>
                          Selected
                        </span>
                      </div>

                      <div className="cart-card-content">
                        <div className="cart-card-top">
                          <div className="cart-card-title">
                            <h3>{ele.name}</h3>

                            <p className="cart-card-location">
                              <i className="fas fa-location-dot"></i>
                              {ele.location}
                            </p>
                          </div>

                          <button
                            className="cart-remove-btn"
                            onClick={() => removeItem(ele.id)}
                            title="Remove PG"
                          >
                            <i className="fas fa-trash-can"></i>
                          </button>
                        </div>

                        <div className="cart-card-info">
                          <div className="cart-info-box">
                            <div className="cart-info-icon">
                              <i className="fas fa-user"></i>
                            </div>

                            <div>
                              <span>Gender</span>
                              <strong>{ele.gender}</strong>
                            </div>
                          </div>

                          <div className="cart-info-box">
                            <div className="cart-info-icon">
                              <i className="fas fa-bed"></i>
                            </div>

                            <div>
                              <span>Availability</span>
                              <strong>{ele.available}</strong>
                            </div>
                          </div>

                          <div className="cart-info-box">
                            <div className="cart-info-icon">
                              <i className="fas fa-calendar-days"></i>
                            </div>

                            <div>
                              <span>Booking</span>
                              <strong>Monthly</strong>
                            </div>
                          </div>
                        </div>

                        <div className="cart-card-bottom">
                          <div className="cart-seat-area">
                            <Bookseats
                              available={ele.available}
                              price={ele.price}
                              quantity={ele.quantity}
                              updateItemQuantity={(quantity) =>
                                updateItemQuantity(ele.id, quantity)
                              }
                            />
                          </div>

                          <div className="cart-product-price">
                            <span>Monthly rent</span>

                            <strong>₹{ele.price}</strong>

                            <small>per seat / month</small>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="real-cart-summary">
                <div className="cart-summary-card">
                  <div className="cart-summary-heading">
                    <div>
                      <span>ORDER SUMMARY</span>
                      <h2>Booking Summary</h2>
                    </div>

                    <div className="summary-icon">
                      <i className="fas fa-receipt"></i>
                    </div>
                  </div>

                  <div className="summary-content">
                    <div className="summary-line">
                      <span>Selected PGs</span>

                      <strong>{totalUniqueItems}</strong>
                    </div>

                    <div className="summary-line">
                      <span>Total seats</span>

                      <strong>{totalItems}</strong>
                    </div>

                    <div className="summary-line">
                      <span>Booking period</span>

                      <strong>Monthly</strong>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-line">
                      <span>Subtotal</span>

                      <strong>₹{cartTotal}</strong>
                    </div>

                    <div className="summary-line">
                      <span>Booking fee</span>

                      <strong className="free">FREE</strong>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-total">
                      <div>
                        <span>Total</span>
                        <small>Including booking fee</small>
                      </div>

                      <strong>₹{cartTotal}</strong>
                    </div>

                    <button className="real-book-btn" onClick={Bookpg}>
                      <span>Book PG</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>

                    <div className="cart-security">
                      <div className="security-icon">
                        <i className="fas fa-shield-halved"></i>
                      </div>

                      <div>
                        <strong>Safe & Secure Booking</strong>

                        <p>Your booking information is protected.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-help">
                  <div className="cart-help-icon">
                    <i className="fas fa-headset"></i>
                  </div>

                  <div>
                    <strong>Need help?</strong>
                    <p>We're here to help with your booking.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  } else {
    return (
      <div className="logincartdiv">
        <div className="logincarticon">
          <i className="fas fa-lock"></i>
        </div>

        <span className="logincartsmall">YOUR PERSONAL BOOKING SPACE</span>

        <h1 className="logincarth1">Your Next Stay Starts Here</h1>

        <p className="logincartdescription">
          Sign in to view your selected PGs, manage your seats, and complete
          your booking. Your perfect place to stay is just a few clicks away.
        </p>

        <button className="logincartbutton" onClick={Logincheckcart}>
          <i className="fas fa-user"></i> Login to Continue
        </button>

        <p className="logincartbottom">
          <i className="fas fa-shield-halved"></i>
          Your comfort and convenience matter to us.
        </p>

        <div className="logincartfeatures">
          <div>
            <i className="fas fa-bed"></i>
            <span>Comfortable PGs</span>
          </div>

          <div>
            <i className="fas fa-location-dot"></i>
            <span>Great Locations</span>
          </div>

          <div>
            <i className="fas fa-calendar-check"></i>
            <span>Easy Booking</span>
          </div>
        </div>
      </div>
    );
  }
}

export { Cart };
