
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Profile() {
  const [user, setuser] = useState({});
  let login = localStorage.getItem("login");

  const [editform, openeditform] = useState(false);
  const [datapopup, opendatapopup] = useState(false);
  const [bookedpg, setbookedpg] = useState([]);
  const [myenquiries, setmyenquiries] = useState([]);
  const [enquirypopup, openenquirypopup] = useState(false);

  const [id, setid] = useState("");
  const [editname, seteditname] = useState("");
  const [editemail, seteditemail] = useState("");
  const [editpincode, seteditpincode] = useState("");
  const [editstate, seteditstate] = useState("");
  const [editcity, seteditcity] = useState("");
  const [editimage, seteditimage] = useState("");

  function getuser() {
    let loggeduser = JSON.parse(localStorage.getItem("loggedinuser"));

    if (!loggeduser) {
      return;
    }

    setuser(loggeduser);
    setid(loggeduser._id);

    console.log("USER DATA:", loggeduser);
    console.log("USER ID:", loggeduser._id);
  }

  useEffect(() => {
    if (login === "yes") {
      getuser();
    }
  }, []);

  async function Bookeddata() {
    let loggeduser = JSON.parse(localStorage.getItem("loggedinuser"));

    if (!loggeduser) {
      toast.error("Please login first");
      return;
    }

    let apilink = await fetch("https://pgbackend-umber.vercel.app/booking");
    let data = await apilink.json();

    let userbookings = data.filter(function (booking) {
      return booking.userId === loggeduser.id;
    });

    setbookedpg(userbookings);
    opendatapopup(true);
  }

  async function Getenquiries() {
    let loggeduser = JSON.parse(localStorage.getItem("loggedinuser"));

    if (!loggeduser) {
      toast.error("Please login first");
      return;
    }

    let apilink = await fetch("https://pgbackend-umber.vercel.app/enquiry");
    let data = await apilink.json();

    let result = data.filter(function (enquiry) {
      return enquiry.email === loggeduser.email;
    });

    setmyenquiries(result);
    openenquirypopup(true);
  }

  function Openeditpopup() {
    setid(user._id);

    console.log("EDIT ID:", user._id);

    seteditname(user.name || "");
    seteditemail(user.email || "");
    seteditpincode(String(user.pincode || ""));
    seteditstate(user.state || "");
    seteditcity(user.city || "");
    seteditimage(user.image || "");

    openeditform(true);
  }

  async function Editdata(e) {
    e.preventDefault();

    if (!id) {
      toast.error("User ID not found");
      return;
    }

    if (editname.length < 3) {
      toast.error("Please enter valid name");
    } else if (editemail.length < 5) {
      toast.error("Please enter valid email");
    } else if (editpincode.length !== 6) {
      toast.error("Please enter valid pincode");
    } else if (editstate === "") {
      toast.error("Please enter state");
    } else if (editcity === "") {
      toast.error("Please enter city");
    } else {
      const data = {
        name: editname,
        email: editemail,
        pincode: editpincode,
        state: editstate,
        city: editcity,
        image: editimage,
      };

      let apilink = await fetch(`https://pgbackend-umber.vercel.app//editprofile/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (apilink.ok) {
        let updateduser = {
          ...user,
          ...data,
          _id: id,
        };

        setuser(updateduser);
        setid(id);

        localStorage.setItem("loggedinuser", JSON.stringify(updateduser));

        toast.success("Profile updated successfully");
        openeditform(false);
      } else {
        toast.error("Profile not updated");
      }
    }
  }

  function Logout() {
    localStorage.removeItem("login");
    localStorage.removeItem("loggedinuser");
  }

  if (login === "yes") {
    return (
      <>
        <Toaster />

        <div className="profile-container">
          <div className="profile-header">
            <h2 className="profile-title">My Profile</h2>
            <p className="profile-subtitle">Manage your personal information</p>
          </div>

          <div className="profile-card">
            <div className="profile-sidebar">
              <div className="profile-avatar">
                <img src={user.image} alt="" />
              </div>

              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
            </div>

            <div className="profile-details">
              <h3 className="profile-section-title">Personal Information</h3>

              <div className="profile-info-group">
                <label className="profile-label">Full Name</label>
                <p className="profile-value">{user.name}</p>
              </div>

              <div className="profile-info-group">
                <label className="profile-label">Email Address</label>
                <p className="profile-value">{user.email}</p>
              </div>

              <div className="profile-info-group">
                <label className="profile-label">Pincode</label>
                <p className="profile-value">{user.pincode}</p>
              </div>

              <div className="profile-info-group">
                <label className="profile-label">State</label>
                <p className="profile-value">{user.state}</p>
              </div>

              <div className="profile-info-group">
                <label className="profile-label">City</label>
                <p className="profile-value">{user.city}</p>
              </div>

              <div className="profilebuttons">
                <button className="editprofile" onClick={Openeditpopup}>
                  Edit Profile
                </button>

                <button className="bookeddata" onClick={Bookeddata}>
                  Booked PG
                </button>

                <button className="myenquiriesbutton" onClick={Getenquiries}>
                  My Enquiries
                </button>

                <button className="logout">
                  <Link to="/" onClick={Logout}>
                    Logout
                  </Link>
                </button>

                <button className="returnhome">
                  <Link to="/">Home</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        {enquirypopup && (
          <div className="myenquiries-overlay">
            <div className="myenquiries-popup">
              <i
                className="fas fa-times-circle myenquiries-close"
                onClick={() => openenquirypopup(false)}
              ></i>

              <h2>My Enquiries & Replies</h2>

              {myenquiries.length === 0 ? (
                <p>No enquiries found</p>
              ) : (
                myenquiries.map(function (enquiry) {
                  return (
                    <div className="myenquirycard" key={enquiry._id}>
                      <h3>Your Enquiry</h3>
                      <p>{enquiry.message}</p>

                      <h3>Admin Reply</h3>

                      {enquiry.reply ? (
                        <p>{enquiry.reply}</p>
                      ) : (
                        <p>No reply yet</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {editform && (
          <div className="addnewuserpopup">
            <form onSubmit={Editdata}>
              <i
                id="closepopup"
                className="fas fa-times-circle"
                onClick={() => openeditform(false)}
              ></i>

              <input
                type="text"
                placeholder="Enter Your Name"
                value={editname}
                onChange={(e) => seteditname(e.target.value)}
              />

              <input
                type="email"
                placeholder="Enter Your Email"
                value={editemail}
                onChange={(e) => seteditemail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Enter Your Pincode"
                value={editpincode}
                onChange={(e) => seteditpincode(e.target.value)}
              />

              <input
                type="text"
                placeholder="Enter Your City"
                value={editcity}
                onChange={(e) => seteditcity(e.target.value)}
              />

              <input
                type="text"
                placeholder="Enter Your State"
                value={editstate}
                onChange={(e) => seteditstate(e.target.value)}
              />

              <input
                type="text"
                placeholder="Enter Image URL"
                value={editimage || ""}
                onChange={(e) => seteditimage(e.target.value)}
              />

              <button className="submitbutton" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}

        {datapopup && (
          <div className="bookedpg-overlay">
            <div className="bookedpg-popup">
              <i
                className="fas fa-times-circle bookedpg-close"
                onClick={() => opendatapopup(false)}
              ></i>

              <h1 className="bookedpg-title">My Booked PGs</h1>

              {bookedpg.length === 0 ? (
                <p className="bookedpg-empty">No PG booked yet</p>
              ) : (
                bookedpg.map(function (pg, index) {
                  return (
                    <div className="bookedpg-card" key={index}>
                      <img
                        className="bookedpg-image"
                        src={pg.image}
                        alt={pg.name}
                      />

                      <div className="bookedpg-details">
                        <h2>{pg.name}</h2>
                        <p>Location: {pg.location}</p>
                        <p>Price: ₹{pg.price}</p>
                        <p>Seats: {pg.quantity}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className="profile-login-container">
        <h1 className="profile-login-title">Login First</h1>

        <Link to="/login" className="profile-login-link">
          Login
        </Link>
      </div>
    );
  }
}

export { Profile };
