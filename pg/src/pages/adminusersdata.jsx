
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

function Adminusersdata() {
  const [data, usersdata] = useState([]);
  const [popup, openpopup] = useState(false);

  const [eye, seteye] = useState("fas fa-eye-slash");
  const [passwordtype, setpasswordtype] = useState("password");

  const [eye2, seteye2] = useState("fas fa-eye-slash");
  const [passwordtype2, setpasswordtype2] = useState("password");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  async function Usersinformation() {
    let apilink = await fetch("http://localhost:5000/login");
    let result = await apilink.json();
    usersdata(result);
  }

  useEffect(() => {
    Usersinformation();
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

  function Eye2() {
    if (eye2 === "fas fa-eye-slash") {
      seteye2("fas fa-eye");
      setpasswordtype2("text");
    } else {
      seteye2("fas fa-eye-slash");
      setpasswordtype2("password");
    }
  }

  async function Deleteuser(id) {
    if (id === "") {
      toast.error("Please select any user");
    } else {
      if (window.confirm("Are you sure to delete?")) {
        try {
          let apilink = await fetch(
            `http://localhost:5000/deletelogin/${id}`,
            {
              method: "DELETE",
            }
          );

          if (apilink.ok) {
            toast.success("User deleted successfully");
            Usersinformation();
            setshowresults(false);
          } else {
            toast.error("User not deleted");
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    }
  }

  async function Register(formdata) {
    try {
      let checkuser = await fetch("http://localhost:5000/login");
      let users = await checkuser.json();

      let userexists = users.find(function (user) {
        return user.email === formdata.email;
      });

      if (userexists) {
        toast.error("User already exists");
        return;
      }

      let newuser = {
        name: formdata.name,
        email: formdata.email,
        image: formdata.image,
        password: formdata.password,
        city: formdata.city,
        state: formdata.state,
        pincode: formdata.pincode,
      };

      let apilink = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newuser),
      });

      if (apilink.ok) {
        toast.success("Registration Successfully");

        reset();
        seteye("fas fa-eye-slash");
        setpasswordtype("password");
        seteye2("fas fa-eye-slash");
        setpasswordtype2("password");

        openpopup(false);
        Usersinformation();
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const [search, setsearch] = useState("");
  const [showresults, setshowresults] = useState(false);

  function Showresult() {
    setshowresults(true);
  }

  function Closeshowresult() {
    setshowresults(false);
    setsearch("");
  }

  return (
    <>
      <Toaster />

      <div className="searchinputdiv">
        <button
          className="addnewuserbutton"
          onClick={() => openpopup(true)}
        >
          Add new user
        </button>

        <input
          type="text"
          placeholder="Search User here"
          className="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        {search.length > 0 && (
          <div className="adminsearchresults">
            {data
              .filter((ele) =>
                ele.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((ele) => (
                <div
                  className="adminsearchresult"
                  key={ele._id}
                  onClick={() => {
                    setsearch(ele.name);
                    Showresult();
                  }}
                >
                  <p>{ele.name}</p>
                </div>
              ))}

            {data.filter((ele) =>
              ele.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && <p>User not exist</p>}
          </div>
        )}
      </div>

      {showresults && (
        <div className="searcheduserdiv">
          <i
            onClick={Closeshowresult}
            className="fas fa-times-circle"
          ></i>

          {data
            .filter((ele) =>
              ele.name.toLowerCase() === search.toLowerCase()
            )
            .map((ele) => (
              <div className="searcheduser" key={ele._id}>
                <p>Name: {ele.name}</p>
                <p>Email: {ele.email}</p>
                <p>Password: {ele.password}</p>
                <p>City: {ele.city}</p>
                <p>State: {ele.state}</p>
                <p>Pincode: {ele.pincode}</p>

                <button
                  className="deletedatabutton"
                  onClick={() => Deleteuser(ele._id)}
                >
                  Delete User
                </button>
              </div>
            ))}
        </div>
      )}

      {popup && (
        <form
          className="registerform"
          onSubmit={handleSubmit(Register)}
        >
          <i
            id="closepopup"
            className="fas fa-times-circle"
            onClick={() => openpopup(false)}
          ></i>

          <h2 className="registertitle">Add New User</h2>

          <input
            className="registername"
            type="text"
            placeholder="Enter Your Name"
            {...register("name", {
              required: "Please enter your name",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters",
              },
            })}
          />
          <p className="namealert">{errors.name?.message}</p>

          <input
            className="registeremail"
            type="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
          />
          <p className="emailalert">{errors.email?.message}</p>

          <div className="registerpasswordbox">
            <input
              className="registerpassword"
              type={passwordtype}
              placeholder="Enter Password"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
            <i onClick={Eye} className={eye}></i>
          </div>
          <p className="passwordalert">{errors.password?.message}</p>

          <div className="registerconfirmpasswordbox">
            <input
              className="registerconfirmpassword"
              type={passwordtype2}
              placeholder="Confirm Password"
              {...register("confirmpassword", {
                required: "Please confirm your password",
                validate: function (value) {
                  return value === password || "Password does not match";
                },
              })}
            />
            <i onClick={Eye2} className={eye2}></i>
          </div>
          <p className="confirmpasswordalert">
            {errors.confirmpassword?.message}
          </p>

          <button className="registerbutton" type="submit">
            Register
          </button>
        </form>
      )}

      <div>
        <h2 className="usersdataheading">Users data</h2>

        <span className="totalusers">
          total users = {data.length}
        </span>

        <table className="usersdatatable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((ele) => (
              <tr key={ele._id}>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.password}</td>
                <td>{ele.city}</td>
                <td>{ele.state}</td>
                <td>{ele.pincode}</td>
                <td>
                  <button
                    className="deletedatabutton"
                    onClick={() => Deleteuser(ele._id)}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="7">No users available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export { Adminusersdata };
