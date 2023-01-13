import React from "react";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Login.css";

const LoginPage = ({
  handleSubmit,
  setEmail,
  visibilityLoginPassword,
  setPassword,
  setVisibilityLoginPassword,
  handleForgotPasswordClick,
}) => {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <br />
            <Input
              type="email"
              className="mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon className="text-secondary" />
                </InputAdornment>
              }
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <br />
            <Input
              type={visibilityLoginPassword ? "text" : "password"}
              className=" mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon className="text-secondary" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  {visibilityLoginPassword ? (
                    <VisibilityIcon
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setVisibilityLoginPassword(!visibilityLoginPassword)
                      }
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setVisibilityLoginPassword(!visibilityLoginPassword)
                      }
                    />
                  )}
                </InputAdornment>
              }
            />
          </div>
          <div className="d-grid my-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "teal", color: "white" }}
            >
              Login
            </button>
          </div>
          <p
            className="forgot-password text-right mt-2 text-secondary"
            onClick={handleForgotPasswordClick}
            style={{ cursor: "pointer" }}
          >
            <a href="/" className="link-secondary pe-auto"> Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
