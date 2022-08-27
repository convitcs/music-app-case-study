import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
    const MESSAGE_ERROR = {
        username: "Username error",
        email: "Email error",
        password: "Password error",
        confirmPassword: "Password must be the same"
    };
    const REGEX = {
        username: /^[a-zA-Z]{2,}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/
    };  


  const [form, setForm] = useState({});
  const [regis, setRegis] = useState(-1)

  function handleChange(event) {
  let error = "";
    if (event.target.name === "password") {
      if (form.confirmPassword && form.confirmPassword.value) {
        error =
          event.target.value === form.confirmPassword.value
            ? ""
            : MESSAGE_ERROR[event.target.name];
      } else {
        error = REGEX[event.target.name].test(event.target.value)
          ? ""
          : MESSAGE_ERROR[event.target.name];
      }
    } else if (event.target.name === "confirmPassword") {
      error =
        event.target.value === form.password.value
          ? ""
          : MESSAGE_ERROR[event.target.name];
    } else {
      error = REGEX[event.target.name].test(event.target.value)
        ? ""
        : MESSAGE_ERROR[event.target.name];
    }
    setForm({
      ...form,
      [event.target.name]: { value: event.target.value, error: error }
    });
  }

  function handleSubmit() {
    const isFilled =
      form.username &&
      form.username.value &&
      form.email &&
      form.email.value &&
      form.password &&
      form.password.value &&
      form.confirmPassword &&
      form.confirmPassword.value;
    const isError =
      isFilled &&
      (form.username.error ||
        form.email.error ||
        form.password.error ||
        form.confirmPassword.error);

    if (isFilled && !isError) {
        setRegis(1)
    } else {
        setRegis(0)
    }
  }

  return (
    <div>
       <h1>Sign up</h1>
      <form>
        <div
          className={`custom-input ${form.username &&
            form.username.error &&
            "custom-input-error"}
            m-10 p-5`}
        >
          <label>Username </label>
          <input
            name="username"
            value={(form.username && form.username.value) || ""}
            onChange={handleChange}
          />
          {form.username && form.username.error && (
            <p className="error">{form.username.error}</p>
          )}
        </div>
        <div
          className={`custom-input ${form.email &&
            form.email.error &&
            "custom-input-error"}
            m-10 p-5`}
        >
          <label>Email </label>
          <input
            name="email"
            value={(form.email && form.email.value) || ""}
            onChange={handleChange}
          />
          {form.email && form.email.error && (
            <p className="error">{form.email.error}</p>
          )}
        </div>
        <div
          className={`custom-input ${form.password &&
            form.password.error &&
            "custom-input-error"} m-10 p-5`}
        >
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={(form.password && form.password.value) || ""}
            onChange={handleChange}
          />
          {form.password && form.password.error && (
            <p className="error">{form.password.error}</p>
          )}
        </div>
        <div
          className={`custom-input ${form.confirmPassword &&
            form.confirmPassword.error &&
            "custom-input-error"} m-10 p-5`}
        >
          <label>Confirm password </label>
          <input
            type="password"
            name="confirmPassword"
            value={(form.confirmPassword && form.confirmPassword.value) || ""}
            onChange={handleChange}
          />
          {form.confirmPassword && form.confirmPassword.error && (
            <p className="error">{form.confirmPassword.error}</p>
          )}
        </div>
        <div className="button mtb-20">
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
        </div>
        <div className={`registerAlert`}>
            {regis == 1 ? 
            <div>
                <p>Regis success</p>
                <Link to="/login">Click here to log in</Link>
            </div>
            :
                regis==0 ? 
                <div>
                    <p>Please fill out all the fields!!!</p>
                </div>
                :
                ""
            }
        </div>
      </form>
    </div>
  );
};

export default Register;
