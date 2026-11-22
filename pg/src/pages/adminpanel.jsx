import React, { useState } from "react";
import { Adminproducts } from "./adminproducts";
import { Adminusersdata } from "./adminusersdata";
import { NavLink, useNavigate } from "react-router-dom";
import { Adminlogindata } from "./adminlogindata";
import toast, { Toaster } from "react-hot-toast";
import { Adminbookdata } from "./adminbookdata";
import { Adminenquiry } from "./adminenquiry";

function AdminPanel() {
  const [page, setpage] = useState( localStorage.getItem("adminrole") === "admin" ? <Adminusersdata />: <Adminenquiry />
);
  const navigate = useNavigate();

  const adminrole = localStorage.getItem("adminrole");

  function Usersdata() {
    setpage(<Adminusersdata />);
  }

  function Products() {
    setpage(<Adminproducts />);
  }

  function Admindata() {
    setpage(<Adminlogindata />);
  }

  function Bookdata() {
    setpage(<Adminbookdata />);
  }

  function Enquiry() {
    setpage(<Adminenquiry />);
  }

  function Logout() {
    localStorage.removeItem("adminrole");
    localStorage.removeItem("adminemail");
    toast.success("Admin Logout Successfully");
  }

  return (
    <>
      <Toaster />

      <div className="adminpanel">
        <div className="adminpanelleft">
           {adminrole === "admin" && (
            <NavLink onClick={Usersdata}>Users Data</NavLink>
          )}

           {adminrole === "admin" && (
            <NavLink onClick={Products}>Products</NavLink>
          )}

          <NavLink onClick={Enquiry}>Enquiries</NavLink>

          {adminrole === "admin" && (
            <NavLink onClick={Admindata}>Add Sub-Admin</NavLink>
          )}

          {
            adminrole==="admin" && (
              <NavLink onClick={Bookdata}>Book Data</NavLink>
            )
          }

          <NavLink to="/adminlogin" onClick={Logout}>
            Logout
          </NavLink>
        </div>

        <div className="adminpanelright">
          <div>{page}</div>
        </div>
      </div>
    </>
  );
}

export { AdminPanel };