import React from "react";
import toast from "react-hot-toast";

function Bookseats({ available, price, quantity, updateItemQuantity }) {
  function Add() {
    if (quantity >= available) {
      toast.error(`only ${available} seats are available`);
    } else {
      updateItemQuantity(quantity + 1);
    }
  }

  function Minus() {
    if (quantity <= 1) {
      toast.error("Minimum one seat is mandatory for booking");
    } else {
      updateItemQuantity(quantity - 1);
    }
  }

  return (
    <div className="seatcounter">
      <h4 className="headingseats">No. of seats booking</h4>

      <button onClick={Minus} className="minusseats">
        -
      </button>

      <span className="noofseats">{quantity}</span>

      <button onClick={Add} className="addseats">
        +
      </button>

      <span className="priceofseats">₹{quantity * price}</span>
    </div>
  );
}

export { Bookseats };
