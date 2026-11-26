import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const [email, setemail] = useState("");
  const [emailalert, setemailalert] = useState("");

  const [password, setpassword] = useState("");
  const [passwordalert, setpasswordalert] = useState("");

  const [eye, seteye] = useState("fas fa-eye-slash");
  const [passwordtype, setpasswordtype] = useState("password");

  const navigate = useNavigate();

  

  const [getdata, checkdata] = useState([]);

  async function Getdata() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app//admindata");
    let data = await apilink.json();
    checkdata(data);
  }

  useEffect(() => {
    Getdata();
  }, []);

  function Eye() {
    if (eye === "fas fa-eye-slash") {
      seteye("fas fa-eye");
      setpasswordtype("text");
    } else {
      seteye("fas fa-eye-slash");
      setpasswordtype("password");
    }
  }

  function Adminlogincheck() {
    if (email.length > 4) {
      setemailalert("");
    } else {
      setemailalert("Please Enter Valid Email");
    }

    if (password.length > 4) {
      setpasswordalert("");
    } else {
      setpasswordalert("Please Enter Valid Password");
    }

    if (email.length > 4 && password.length > 4) {
      for (let i = 0; i < getdata.length; i++) {
        if (getdata[i].email === email && getdata[i].password === password) {
          localStorage.setItem("adminrole", getdata[i].role);
          localStorage.setItem("adminemail", getdata[i].email);

          toast.success(" Admin Login Successful");
          navigate("/adminpanel");
          return;
        }
      }

      toast.error("Wrong Email and Password");
    }
  }

  return (
    <>
      <Toaster />
      <div className="adminlogin">
        <h3 className="adminheading">Admin Login</h3>
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <p className="adminemailalert">{emailalert}</p>
        <div className="passwordbox">
          <input
            type={passwordtype}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <i onClick={Eye} className={eye}></i>
        </div>
        <p className="adminpasswordalert">{passwordalert}</p>
        <button onClick={Adminlogincheck}>Submit</button>
      </div>
    </>
  );
}

export { Adminlogin };
