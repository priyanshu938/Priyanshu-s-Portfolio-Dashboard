import React, { useState } from "react";
import "./Login.css";
import url from "../../ServerUrl";
import Snackbar from "../ReusableComponents/Snackbar";
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Please fill all the fields");
    } else {
      try {
        const res = await axios.post(`${url}/user/login`, {
          email: email,
          password: password,
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
          window.localStorage.setItem("token", res.data.token);
        }
      } catch (error) {
        setIsOpen(true);
        setSeverity("error");
        setMessage("Invalid email or password");
      }
    }
  };
  return (
    <div>
      <Snackbar
        isOpen={isOpen}
        severity={severity}
        message={message}
        setIsOpen={setIsOpen}
      />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="forgot-password text-right mt-2 text-secondary">
              <a className="link-secondary"> Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
