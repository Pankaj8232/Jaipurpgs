import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginForm() {
  const [eye, seteye] = useState("fas fa-eye-slash");
  const [passwordtype, setpasswordtype] = useState("password");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function Eye() {
    if (eye === "fas fa-eye-slash") {
      seteye("fas fa-eye");
      setpasswordtype("text");
    } else {
      seteye("fas fa-eye-slash");
      setpasswordtype("password");
    }
  }

  async function Submit(formdata) {
    try {
      let apilink = await fetch("https://pgbackend-umber.vercel.app//login");

      if (!apilink.ok) {
        toast.error("Unable to connect to server");
        return;
      }

      let data = await apilink.json();

      let loginuser = null;

      for (let i = 0; i < data.length; i++) {
        if (
          data[i].email === formdata.email &&
          data[i].password === formdata.password
        ) {
          loginuser = data[i];
          break;
        }
      }

      if (loginuser) {
        localStorage.setItem("login", "yes");
        localStorage.setItem("loggedinuser", JSON.stringify(loginuser));

        toast.success("Login Successfully");
        navigate("/");
      } else {
        toast.error("Enter right email and password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  function Registergo() {
    navigate("/register");
  }

  return (
    <>
      <Toaster />

      <form onSubmit={handleSubmit(Submit)} className="loginform">
        <label className="loginformlabel">Login</label>

        <input
          type="email"
          placeholder="Enter Your Email"
          className="checkemail"
          {...register("email", {
            required: "Please enter your email",
          })}
        />

        <p className="emailalert">{errors.email?.message}</p>

        <div className="passwordbox">
          <input
            type={passwordtype}
            placeholder="Enter Password"
            className="checkpassword"
            {...register("password", {
              required: "Please enter valid password",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
          />

          <i onClick={Eye} className={eye}></i>
        </div>

        <p className="passwordalert">{errors.password?.message}</p>

        <button className="loginbutton" type="submit">
          Login
        </button>

        <p className="registergo" onClick={Registergo}>
          Don't have an account? <span>Register</span>
        </p>
      </form>
    </>
  );
}

export { LoginForm };
