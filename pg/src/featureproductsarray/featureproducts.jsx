import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Featurearray() {
  const [products, allproducts] = useState([]);

  async function Getapi() {
    let apilink = await fetch("http://localhost:5000/products");
    let data = await apilink.json();
    allproducts(data);
  }

  useEffect(() => {
    Getapi();
  }, []);

  return (
    // <div className="procutsarray">
    //   {Featureproducts.map((ele) => (
    //     <Link
    //       key={ele.id}
    //       to={`/aboutproductdetails/${ele.slug}`}
    //       className="product"
    //     >
    //       <h2 className="pgname">{ele.name}</h2>

    //       <h3 className="pglocation">{ele.location}</h3>

    //       <div className="pgimagesarray">
    //         <img src={ele.image} alt={ele.name} />
    //       </div>
    //     </Link>
    //   ))}
    // </div>





    
    <div className="procutsarray">
      {products.map((ele) => (
        <Link
          key={ele.id}
          to={`/aboutproductdetails/${ele.slug}`}
          className="product"
        >
          <h2 className="pgname">{ele.name}</h2>

          <h3 className="pglocation">{ele.location}</h3>

          <div className="pgimagesarray">
            <img src={ele.image} alt={ele.name} />
          </div>
        </Link>
      ))}
    </div>
  );
}



export { Featurearray };

