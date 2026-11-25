
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

function Adminlogindata() {
  const [eye, seteye] = useState("fas fa-eye-slash");
  const [passwordtype, setpasswordtype] = useState("password");

  const [data, fulldata] = useState([]);
  const [id, setid] = useState("");

  const [popup, openpopup] = useState(false);

  const [editeye, setediteye] = useState("fas fa-eye-slash");
  const [editpasswordtype, seteditpasswordtype] = useState("password");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: editregister,
    handleSubmit: handleEditsubmit,
    reset: editreset,
    formState: { errors: editerrors },
  } = useForm();

  async function Getdata() {
    let apilink = await fetch("http://localhost:5000/admindata");
    let result = await apilink.json();

    console.log(result);
    fulldata(result);
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

  function EditEye() {
    if (editeye === "fas fa-eye-slash") {
      setediteye("fas fa-eye");
      seteditpasswordtype("text");
    } else {
      setediteye("fas fa-eye-slash");
      seteditpasswordtype("password");
    }
  }

  async function Adminlogincheck(formdata) {
    try {
      let newdata = {
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        password: formdata.password,
        city: formdata.city,
        state: formdata.state,
        role: formdata.role,
      };

      let apilink = await fetch("http://localhost:5000/admindata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      });

      if (apilink.ok) {
        toast.success("Data set successfully");
        reset();
        Getdata();
      } else {
        toast.error("Data not set");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function Deleteuser(id) {
    let selecteduser = data.find(function (user) {
      return user._id === id;
    });

    if (!selecteduser) {
      toast.error("Please select any sub-admin for delete");
    } else if (selecteduser.role === "admin") {
      toast.error("Main Admin cannot be deleted");
    } else {
      if (window.confirm("Are you sure to delete?")) {
        try {
          let apilink = await fetch(
            `http://localhost:5000/deleteadmin/${id}`,
            {
              method: "DELETE",
            }
          );

          if (apilink.ok) {
            toast.success("Sub-admin deleted successfully");
            Getdata();
            setid("");
          } else {
            toast.error("Sub-admin not deleted");
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    }
  }

  function Openpopup(e) {
    setid(e._id);

    editreset({
      editname: e.name,
      editemail: e.email,
      editphone: e.phone,
      editpassword: e.password,
      editcity: e.city,
      editstate: e.state,
      editrole: e.role,
    });

    setediteye("fas fa-eye-slash");
    seteditpasswordtype("password");

    openpopup(true);
  }

  async function Editdata(formdata) {
    try {
      let updatedata = {
        name: formdata.editname,
        email: formdata.editemail,
        phone: formdata.editphone,
        password: formdata.editpassword,
        city: formdata.editcity,
        state: formdata.editstate,
        role: formdata.editrole,
      };

      let apilink = await fetch(
        `http://localhost:5000/editadmin/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedata),
        }
      );

      if (apilink.ok) {
        toast.success("Admin updated successfully");
        openpopup(false);
        Getdata();
      } else {
        toast.error("Admin not updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Toaster />

      <h1>Add Sub-Admin</h1>

      <form
        className="adminlogindata"
        onSubmit={handleSubmit(Adminlogincheck)}
      >
        <input
          type="text"
          placeholder="Enter Your Name"
          {...register("name", {
            required: "Please Enter Valid Name",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
        />
        <p className="adminpasswordalert">{errors.name?.message}</p>

        <input
          type="email"
          placeholder="Enter Your Email"
          {...register("email", {
            required: "Please Enter Valid Email",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
        />
        <p className="adminpasswordalert">{errors.email?.message}</p>

        <select
          className="selectrole"
          {...register("role", {
            required: "Please select role",
            validate: function (value) {
              return (
                value === "admin" ||
                value === "subadmin" ||
                "Please select a valid role"
              );
            },
          })}
        >
          <option value="">Select Role</option>
          <option value="admin">Main Admin</option>
          <option value="subadmin">Sub Admin</option>
        </select>
        <p className="adminpasswordalert">{errors.role?.message}</p>

        <input
          type="text"
          placeholder="Enter Your Phone Number"
          {...register("phone", {
            required: "Please Enter Valid Phone Number",
            pattern: {
              value: /^\d{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        <p className="adminpasswordalert">{errors.phone?.message}</p>

        <div className="passwordbox">
          <input
            type={passwordtype}
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Please Enter Valid Password",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
          />
          <i onClick={Eye} className={eye}></i>
        </div>
        <p className="adminpasswordalert">{errors.password?.message}</p>

        <input
          type="text"
          placeholder="Enter Your City"
          {...register("city", {
            required: "Please Enter Valid City",
            minLength: {
              value: 3,
              message: "City must be at least 3 characters",
            },
          })}
        />
        <p className="adminpasswordalert">{errors.city?.message}</p>

        <input
          type="text"
          placeholder="Enter Your State"
          {...register("state", {
            required: "Please Enter Valid State",
            minLength: {
              value: 3,
              message: "State must be at least 3 characters",
            },
          })}
        />
        <p className="adminpasswordalert">{errors.state?.message}</p>

        <button className="admindatabutton" type="submit">
          Set Data
        </button>
      </form>

      <h1>Sub-Admin Data</h1>

      <table className="admindatatable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone no.</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {data.map(function (e) {
            return (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role === "admin" ? "Main Admin" : "Sub Admin"}</td>
                <td>{e.phone}</td>
                <td>{e.city}</td>
                <td>{e.state}</td>

                <td>
                  <button
                    className="deletedatabutton"
                    onClick={() => Deleteuser(e._id)}
                  >
                    Delete
                  </button>
                </td>

                <td>
                  <button
                    className="edtibutton"
                    onClick={() => Openpopup(e)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}

          {data.length === 0 && (
            <tr>
              <td colSpan="8">No sub-admin data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {popup && (
        <div className="addnewuserpopup">
          <form onSubmit={handleEditsubmit(Editdata)}>
            <i
              id="closepopup"
              className="fas fa-times-circle"
              onClick={() => openpopup(false)}
            ></i>

            <input
              type="text"
              placeholder="Enter Your Name"
              {...editregister("editname", {
                required: "Please Enter Valid Name",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            <p className="adminpasswordalert">
              {editerrors.editname?.message}
            </p>

            <input
              type="email"
              placeholder="Enter Your Email"
              {...editregister("editemail", {
                required: "Please Enter Valid Email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <p className="adminpasswordalert">
              {editerrors.editemail?.message}
            </p>

            <select
              {...editregister("editrole", {
                required: "Please select role",
                validate: function (value) {
                  return (
                    value === "admin" ||
                    value === "subadmin" ||
                    "Please select a valid role"
                  );
                },
              })}
            >
              <option value="">Select Role</option>
              <option value="admin">Main Admin</option>
              <option value="subadmin">Sub Admin</option>
            </select>
            <p className="adminpasswordalert">
              {editerrors.editrole?.message}
            </p>

            <input
              type="text"
              placeholder="Enter Your Phone Number"
              {...editregister("editphone", {
                required: "Please Enter Valid Phone Number",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
            <p className="adminpasswordalert">
              {editerrors.editphone?.message}
            </p>

            <div className="passwordbox">
              <input
                type={editpasswordtype}
                placeholder="Enter Your Password"
                {...editregister("editpassword", {
                  required: "Please Enter Valid Password",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters",
                  },
                })}
              />
              <i onClick={EditEye} className={editeye}></i>
            </div>
            <p className="adminpasswordalert">
              {editerrors.editpassword?.message}
            </p>

            <input
              type="text"
              placeholder="Enter Your City"
              {...editregister("editcity", {
                required: "Please Enter Valid City",
                minLength: {
                  value: 3,
                  message: "City must be at least 3 characters",
                },
              })}
            />
            <p className="adminpasswordalert">
              {editerrors.editcity?.message}
            </p>

            <input
              type="text"
              placeholder="Enter Your State"
              {...editregister("editstate", {
                required: "Please Enter Valid State",
                minLength: {
                  value: 3,
                  message: "State must be at least 3 characters",
                },
              })}
            />
            <p className="adminpasswordalert">
              {editerrors.editstate?.message}
            </p>

            <button type="submit" className="admindatabutton">
              Edit Data
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export { Adminlogindata };
