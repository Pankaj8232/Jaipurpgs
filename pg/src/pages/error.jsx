import React from "react";
import { Link } from "react-router-dom";

function Errorpage() {
  return (
    <>
      <h1 className="errorheading">404</h1>
      <h2 className="errorheading2">Page Not Found</h2>
      <p className="errorparagraph">Sorry, the page you're looking for doesn't exist.</p>
    </>
  );
}

export { Errorpage };
