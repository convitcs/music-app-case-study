import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const  Login = () => {
const [login,setLogin] = useState(-1)
const nevigate = useNavigate()

  const MESSAGE_ERROR = {
    email: "Email error",
    password: "Password error"
  };

  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/
  };

  const [form, setForm] = useState({});

  function handleChange(event) {
    let error = REGEX[event.target.name].test(event.target.value)
      ? ""
      : MESSAGE_ERROR[event.target.name];
    setForm({
      ...form,
      [event.target.name]: { value: event.target.value, error: error }
    });
  }

  function handleSubmit(event) {
    console.log({form})
    const isFilled =
      form.email && form.email.value && form.password && form.password.value;
    const isError = isFilled && (form.email.error || form.password.error);
    
    const user = (form.email.value === "hcminhqn@gmail.com") && (form.password.value === "MinhMinh")
    console.log("user ne ba:"+user)
    isFilled && !isError && user
        ? setLogin(1)
        : setLogin(0)
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div
          className={`custom-input ${form.email &&
            form.email.error &&
            "custom-input-error"}`}
        >
          <label>Email </label>
          <input
            name="email"
            value={(form.email && form.email.value) || ""}
            onChange={handleChange}
          />
          {form.email && form.email.error && (
            <p className="error">Email error</p>
          )}
        </div>
        <div
          className={`custom-input ${form.password &&
            form.password.error &&
            "custom-input-error"}`}
        >
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={(form.password && form.password.value) || ""}
            onChange={handleChange}
          />
          {form.password && form.password.error && (
            <p className="error">Password error</p>
          )}
        </div>
        <div className="button">
            <button className="button" type="button" onClick={handleSubmit}>
            Submit
            </button>
        </div>
        <div className={`registerAlert`}>
            {login == 1 ? 
            <div>
                <p>Login success</p>
                <p>We are getting you in...</p>
                {setTimeout(nevigate('/homePage'),10000)}
            </div>
            :
                login==0 ? 
                <div>
                    <p>Login failed!!!</p>
                </div>
                :
                ""
            }
        </div>
      </form>
    </div>
  );
}

export default Login