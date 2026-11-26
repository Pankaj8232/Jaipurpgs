
import React, { useState, useEffect } from "react";

function Adminbookdata() {
  const [bookdata, getbookdata] = useState([]);
  const [users, usersdata] = useState([]);
  const [popup, openpopup] = useState(null);

  async function Getdata() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app//booking");
    let data = await apilink.json();
    getbookdata(data);
  }

  async function Getuserdata() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app//login");
    let data = await apilink.json();
    usersdata(data);
  }

  useEffect(() => {
    Getdata();
    Getuserdata();
  }, []);

  let selecteduser = users.find((ele) => ele.id === popup?.userId);

  return (
    <div className="adminbookdata">
      <h2>Booked Data</h2>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>PG Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Gender</th>
            <th>UTR</th>
            <th>Total</th>
            <th>Users Details</th>
          </tr>
        </thead>

        <tbody>
          {bookdata.map((ele) => {
            return (
              <tr key={ele.id}>
                <td><img src={ele.image} alt="" /></td>
                <td>{ele.name}</td>
                <td>{ele.location}</td>
                <td>{ele.price}</td>
                <td>{ele.quantity}</td>
                <td>{ele.gender}</td>
                <td>{ele.utr}</td>
                <td>{ele.price * ele.quantity}</td>

                <td>
                  <button onClick={() => openpopup(ele)}>
                    Users Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {popup && (
        <div className="userdatapopup">
          <div className="userdatabox">
            <i onClick={() => openpopup(null)} class="fas fa-times-circle"></i>

            <h2>Booked Users Details</h2>

            {selecteduser ? (
              <>
                <p>Name: {selecteduser.name}</p>
                <p>Email: {selecteduser.email}</p>
                <p>City: {selecteduser.city}</p>
                <p>State: {selecteduser.state}</p>
                <p>Pincode: {selecteduser.pincode}</p>
              </>
            ) : (
              <p>User not found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export  {Adminbookdata};
