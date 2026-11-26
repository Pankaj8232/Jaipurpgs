
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Adminproducts() {
  const [products, allproducts] = useState([]);
  const [popup, openpopup] = useState(false);

  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [price, setprice] = useState("");
  const [slug, setslug] = useState("");
  const [available, setavailable] = useState("");
  const [quantity, setquantity] = useState("");
  const [gender, setgender] = useState("");
  const [image, setimage] = useState("");
  const [more, setmore] = useState("");

  const [deleteproducts, setdeleteproducts] = useState([]);
  const [id, setid] = useState("");

  const [editform, openeditform] = useState(false);

  const [editname, seteditname] = useState("");
  const [editlocation, seteditlocation] = useState("");
  const [editprice, seteditprice] = useState("");
  const [editslug, seteditslug] = useState("");
  const [editavailable, seteditavailable] = useState("");
  const [editquantity, seteditquantity] = useState("");
  const [editgender, seteditgender] = useState("");
  const [editimage, seteditimage] = useState("");
  const [editmore, seteditmore] = useState("");

  const [popup2, openpopup2] = useState(false);
  const [selectedproduct, setselectedproduct] = useState({});

  async function Getapi() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app//products");
    let data = await apilink.json();
    allproducts(data);
  }

  async function Getdeleteproduct() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app//products");
    let data = await apilink.json();
    setdeleteproducts(data);
  }

  async function Deleteproduct(id) {
    if (!id) {
      toast.error("Product ID not found");
    } else {
      let confirmdelete = window.confirm("Are you sure to delete?");

      if (confirmdelete) {
        let apilink = await fetch(`https://pgbackend-umber.vercel.app//Deleteproducts/${id}`, {
          method: "DELETE",
        });

        if (apilink.ok) {
          toast.success("Product deleted successfully");
          setid("");
          openpopup2(false);
          await Getapi();
          await Getdeleteproduct();
        } else {
          toast.error("Product not deleted");
        }
      }
    }
  }

  useEffect(() => {
    Getapi();
    Getdeleteproduct();
  }, []);

  function Openpopup() {
    openpopup(true);
  }

  async function Addproduct(e) {
    e.preventDefault();

    if (name.length < 3) {
      toast.error("Please enter product name");
    } else if (location.length < 2) {
      toast.error("Please enter location");
    } else if (price === "") {
      toast.error("Please enter price");
    } else if (price <= 0) {
      toast.error("Please enter valid price");
    } else if (slug.length < 2) {
      toast.error("Please enter slug");
    } else if (available === "") {
      toast.error("Please enter available beds");
    } else if (available < 0) {
      toast.error("Please enter valid available beds");
    } else if (quantity === "") {
      toast.error("Please enter total beds");
    } else if (quantity <= 0) {
      toast.error("Please enter valid total beds");
    } else if (gender === "") {
      toast.error("Please enter gender");
    } else if (image === "") {
      toast.error("Please enter image URL");
    } else if (more === "") {
      toast.error("Please enter facilities");
    } else {
      const data = {
        name: name,
        location: location,
        price: price,
        slug: slug,
        available: available,
        quantity: quantity,
        gender: gender,
        image: image,
        more: more,
      };

      const apilink = await fetch("https://pgbackend-umber.vercel.app//addproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (apilink.ok) {
        toast.success("Product added successfully");

        setname("");
        setlocation("");
        setprice("");
        setslug("");
        setavailable("");
        setquantity("");
        setgender("");
        setimage("");
        setmore("");

        openpopup(false);
        Getapi();
        Getdeleteproduct();
      } else {
        toast.error("Product not added");
      }
    }
  }

  function Openeditpopup(ele) {
    setid(ele._id);

    seteditname(ele.name);
    seteditlocation(ele.location);
    seteditprice(ele.price);
    seteditslug(ele.slug);
    seteditavailable(ele.available);
    seteditquantity(ele.quantity);
    seteditgender(ele.gender);
    seteditimage(ele.image);
    seteditmore(ele.more);

    openeditform(true);
  }

  async function Editproduct(e) {
    e.preventDefault();

    if (editname.length < 3) {
      toast.error("Please enter product name");
    } else if (editlocation.length < 2) {
      toast.error("Please enter location");
    } else if (editprice === "") {
      toast.error("Please enter price");
    } else if (editprice <= 0) {
      toast.error("Please enter valid price");
    } else if (editslug.length < 2) {
      toast.error("Please enter slug");
    } else if (editavailable === "") {
      toast.error("Please enter available beds");
    } else if (editavailable < 0) {
      toast.error("Please enter valid available beds");
    } else if (editquantity === "") {
      toast.error("Please enter total beds");
    } else if (editquantity <= 0) {
      toast.error("Please enter valid total beds");
    } else if (editgender === "") {
      toast.error("Please enter gender");
    } else if (editimage === "") {
      toast.error("Please enter image URL");
    } else if (editmore === "") {
      toast.error("Please enter facilities");
    } else {
      const data = {
        name: editname,
        location: editlocation,
        price: editprice,
        slug: editslug,
        available: editavailable,
        quantity: editquantity,
        gender: editgender,
        image: editimage,
        more: editmore,
      };

      const apilink = await fetch(`https://pgbackend-umber.vercel.app//editproducts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (apilink.ok) {
        toast.success("Product updated successfully");

        openeditform(false);

        Getapi();
        Getdeleteproduct();
      } else {
        toast.error("Product not updated");
      }
    }
  }

  function Popup2(ele) {
    setselectedproduct(ele);
    openpopup2(true);
  }

  const [search, setsearch] = useState("");

  const filteredproducts = products.filter((ele) =>
    ele.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Toaster />

      <div className="adminseachproduct">
        <button onClick={Openpopup} className="addnewproductsbutton">
          Add new products
        </button>

        <div className="adminproductsearchbox">
          <input
            type="text"
            className="searchproducts"
            placeholder="Search Product Here"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />

          {search.length > 0 && (
            <div className="adminproductsearchresults">
              {filteredproducts.length > 0 ? (
                filteredproducts.map((ele) => (
                  <div
                    className="adminproductsearchresult"
                    key={ele._id}
                    onClick={() => {
                      Popup2(ele);
                      setsearch("");
                    }}
                  >
                    <p>{ele.name}</p>
                    <span>{ele.location}</span>
                  </div>
                ))
              ) : (
                <p className="adminproductnotfound">Product not found</p>
              )}
            </div>
          )}
        </div>
      </div>

      {popup && (
        <div className="addnewuserpopup">
          <form onSubmit={Addproduct}>
            <i
              id="closepopup"
              className="fas fa-times-circle"
              onClick={() => openpopup(false)}
            ></i>

            <input
              type="text"
              className="addnewproductname"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductlocation"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductprice"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductslug"
              placeholder="Enter Slug"
              value={slug}
              onChange={(e) => setslug(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductavailable"
              placeholder="Enter Available Beds"
              value={available}
              onChange={(e) => setavailable(e.target.value)}
            />

            <input
              type="number"
              className="addnewproductquantity"
              placeholder="Enter Total Beds"
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductgender"
              placeholder="Enter Gender"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductimage"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setimage(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductfacilities"
              placeholder="Enter Facilities"
              value={more}
              onChange={(e) => setmore(e.target.value)}
            />

            <button className="addnewproductbutton" type="submit">
              Add Product
            </button>
          </form>
        </div>
      )}

      <div className="adminproductsdata">
        <h2 className="adminproductsheading">Products Data</h2>

        <table className="adminproductstable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Image</th>
              <th>Price</th>
              <th>More</th>
              <th>Action</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {products.map((ele) => (
              <tr key={ele._id}>
                <td>{ele.name}</td>

                <td>{ele.location}</td>

                <td>
                  <img src={ele.image} alt={ele.name} />
                </td>

                <td>₹{ele.price} / month</td>

                <td>
                  <button
                    className="adminproductmorebutton"
                    onClick={() => Popup2(ele)}
                  >
                    More
                  </button>
                </td>

                <td>
                  <button
                    className="deleteproductbutton"
                    onClick={() => Deleteproduct(ele._id)}
                  >
                    Delete Product
                  </button>
                </td>

                <td>
                  <button
                    className="edtibutton"
                    onClick={() => Openeditpopup(ele)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="10" className="adminproductsempty">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editform && (
        <div className="addnewuserpopup">
          <form onSubmit={Editproduct}>
            <i
              id="closepopup"
              className="fas fa-times-circle"
              onClick={() => openeditform(false)}
            ></i>

            <input
              type="text"
              className="addnewproductname"
              placeholder="Enter Product Name"
              value={editname}
              onChange={(e) => seteditname(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductlocation"
              placeholder="Enter Location"
              value={editlocation}
              onChange={(e) => seteditlocation(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductprice"
              placeholder="Enter Price"
              value={editprice}
              onChange={(e) => seteditprice(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductslug"
              placeholder="Enter Slug"
              value={editslug}
              onChange={(e) => seteditslug(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductavailable"
              placeholder="Enter Available Beds"
              value={editavailable}
              onChange={(e) => seteditavailable(e.target.value)}
            />

            <input
              type="number"
              className="addnewproductquantity"
              placeholder="Enter Total Beds"
              value={editquantity}
              onChange={(e) => seteditquantity(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductgender"
              placeholder="Enter Gender"
              value={editgender}
              onChange={(e) => seteditgender(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductimage"
              placeholder="Enter Image URL"
              value={editimage}
              onChange={(e) => seteditimage(e.target.value)}
            />

            <input
              type="text"
              className="addnewproductfacilities"
              placeholder="Enter Facilities"
              value={editmore}
              onChange={(e) => seteditmore(e.target.value)}
            />

            <button className="addnewproductbutton" type="submit">
              Edit Data
            </button>
          </form>
        </div>
      )}

      {popup2 && (
        <div
          className="productdetailsoverlay"
          onClick={() => openpopup2(false)}
        >
          <div
            className="productdetailspopup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="productdetailsclose"
              onClick={() => openpopup2(false)}
            >
              <i className="fas fa-times"></i>
            </button>

            <h2 className="productdetailstitle">Product Details</h2>

            <img
              className="productdetailsimage"
              src={selectedproduct.image}
              alt={selectedproduct.name}
            />

            <h3 className="productdetailsname">{selectedproduct.name}</h3>

            <div className="productdetailsrow">
              <span>Location</span>
              <strong>{selectedproduct.location}</strong>
            </div>

            <div className="productdetailsrow">
              <span>Price</span>
              <strong>₹{selectedproduct.price} / month</strong>
            </div>

            <div className="productdetailsrow">
              <span>Available Beds</span>
              <strong>{selectedproduct.available}</strong>
            </div>

            <div className="productdetailsrow">
              <span>Total Beds</span>
              <strong>{selectedproduct.quantity}</strong>
            </div>

            <div className="productdetailsrow">
              <span>Gender</span>
              <strong>{selectedproduct.gender}</strong>
            </div>

            <div className="productdetailsfacilities">
              <span>Facilities</span>
              <p>{selectedproduct.more}</p>
            </div>

            <button
              className="deleteproductbutton2"
              onClick={() => Deleteproduct(selectedproduct._id)}
            >
              Delete Product
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export { Adminproducts };
