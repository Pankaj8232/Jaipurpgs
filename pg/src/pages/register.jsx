import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Registeruser() {
  const [eye, seteye] = useState("fas fa-eye-slash");
  const [passwordtype, setpasswordtype] = useState("password");

  const [eye2, seteye2] = useState("fas fa-eye-slash");
  const [passwordtype2, setpasswordtype2] = useState("password");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

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

  async function Register(formdata) {
    try {
      const checkuser = await fetch("https://pgbackend-umber.vercel.app/login");

      if (!checkuser.ok) {
        toast.error("Unable to check existing users");
        return;
      }

      const users = await checkuser.json();

      const userexists = users.find(function (user) {
        return user.email === formdata.email;
      });

      if (userexists) {
        toast.error("User already exists");
        return;
      }

      const data = {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      };

      const apilink = await fetch("https://pgbackend-umber.vercel.app/addlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (apilink.ok) {
        toast.success("Registration Successfully");
        navigate("/");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Toaster />

      <form className="registerform" onSubmit={handleSubmit(Register)}>
        <h2 className="registertitle">Register User</h2>

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
    </>
  );
}

export { Registeruser };
