import React from "react";
import { Footerli } from "./footerli";
import { NavLink } from "react-router-dom";



function Footer(){
    return(
        <>
      <div className="footer">
          <Footerli heading="Students" item1="Find PG" item2="Popular Areas" item3="Hostels" item4="How it works" />
        <Footerli heading="PG Owners" item1="List your PG" item2="Pricing" item3={<NavLink to="/adminlogin">Admin login</NavLink>} item4="Owner Help" />  
        <Footerli heading="Company" item1="About Us" item2="Contact" item3="Privacy Policy" item4="Terms" />       
      </div>
        </>
    )
}

export{Footer}