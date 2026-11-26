import React, { useState } from "react";
import { Qrcodegenerator } from "./pages/qrcode";
import { useCart } from "react-use-cart";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Qrcodecart() {

  const { items, cartTotal, emptyCart } = useCart();
  const navigate = useNavigate();

  const qrvalue = `upi://pay?pa=8905509313-3@ybl&pn=JaipurStays&am=${cartTotal}&cu=INR`;

  const [utr, setutr] = useState("");
  const [utralert, setutralert] = useState("");

  async function Postutr() {
    const apilink = await fetch("https://pgbackend-umber.vercel.app//addbooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        utr: utr
      })
    });

    if (!apilink.ok) {
      throw new Error("Failed to save UTR");
    }
  }

async function Bookpg() {
  if (utr.trim().length < 5) {
    setutralert("Please enter valid UTR number");
    return;
  }

  let user = JSON.parse(localStorage.getItem("loggedinuser"));

  try {
    const bookingids = [];

    for (let item of items) {
      const response = await fetch("https://pgbackend-umber.vercel.app//booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: item.name,
          image: item.image,
          location: item.location,
          gender: item.gender,
          available: item.available,
          price: item.price,
          quantity: item.quantity,
          userId: user.id,
          utr: utr.trim(),
          paymentStatus: "Pending Verification"
        })
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      bookingids.push(await response.json());
    }

    toast.success("Booking submitted successfully");
    emptyCart();
    navigate("/");
  } catch (error) {
    toast.error("Failed to save booking");
  }
}

  return (
    <>
      <Toaster />

      <div className="qrcode-page">
        <div className="qrcode-card">
          <h1 className="qrcode-heading">Complete Your Payment</h1>

          <p className="qrcode-description">
            Scan the QR code using your preferred UPI app to pay for your PG booking.
          </p>

          <div className="qrcode-amount">₹{cartTotal}</div>

          <div className="qrcode-image">
            <Qrcodegenerator qrvalue={qrvalue} />
          </div>

          <p className="qrcode-scan-text">Scan QR Code to Pay</p>

          <div className="qrcode-footer">
            <p>JaipurStays PG Booking</p>
            <p>Pay securely using your UPI app.</p>
          </div>

          <div className="qrcode-secure">
            <i className="fas fa-shield-halved"></i>
            Secure Payment
          </div>

          <input
            type="text"
            className="utrinput"
            placeholder="Enter UTR number"
            value={utr}
            onChange={(e) => {
              setutr(e.target.value);
              setutralert("");
            }}
          />

          <p className="utralert">{utralert}</p>

          <button className="paymentbutton" onClick={Bookpg}>
            Payment Done
          </button>
        </div>
      </div>
    </>
  );
}

export { Qrcodecart };