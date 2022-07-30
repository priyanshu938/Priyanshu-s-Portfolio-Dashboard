import React, { useState, useEffect } from "react";
import "./Login.css";
import url from "../../ServerUrl";
import Snackbar from "../ReusableComponents/Snackbar";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import OTPPage from "./OTPPage";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState();
  const [otpId, setOtpId] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginPage, setLoginPage] = useState(true);
  const [forgotPasswordPage, setForgotPasswordPage] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [changePasswordPage, setChangePasswordPage] = useState(false);

  const [visibilityLoginPassword, setVisibilityLoginPassword] = useState(false);
  const [visibilityChangePassword, setVisibilityChangePassword] =
    useState(false);
  const [visibilityChangePasswordConfirm, setVisibilityChangePasswordConfirm] =
    useState(false);

  const [counter, setCounter] = useState(60);

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
  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setLoginPage(false);
    setForgotPasswordPage(true);
    setOtpPage(false);
    setChangePasswordPage(false);
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (email === "") {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Please fill all the fields");
    } else {
      try {
        const res = await axios.post(`${url}/forgotPassword/sendOtp`, {
          email: email,
        });
        if (res.status === 201) {
          setIsOpen(true);
          setSeverity("success");
          setMessage("Otp sent successfully!");
          setOtpId(res.data.otpId);
          setLoginPage(false);
          setForgotPasswordPage(false);
          setOtpPage(true);
          setChangePasswordPage(false);
          setCounter(60);
        } else {
          setIsOpen(true);
          setSeverity("error");
          setMessage("User does not exist!");
        }
      } catch (error) {
        console.log(error);
        setIsOpen(true);
        setSeverity("error");
        setMessage("Internal Server Error!");
      }
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/forgotPassword/verifyOtp`, {
        otpId: otpId,
        otp: otp,
      });
      if (res.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(res.data.message);
        setLoginPage(false);
        setForgotPasswordPage(false);
        setOtpPage(false);
        setChangePasswordPage(true);
      } else {
        setIsOpen(true);
        setSeverity("error");
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setIsOpen(true);
      setSeverity("error");
      setMessage("OTP expired!");
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Please fill all the fields");
    } else if (password !== confirmPassword) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Passwords do not match");
    } else if (password.length < 6) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Password too short !");
    } else {
      try {
        const res = await axios.post(`${url}/forgotPassword/changePassword`, {
          email: email,
          password: password,
        });
        if (res.status === 200) {
          setIsOpen(true);
          setSeverity("success");
          setMessage("Password changed successfully!");
          setLoginPage(true);
          setForgotPasswordPage(false);
          setOtpPage(false);
          setChangePasswordPage(false);
          setEmail("");
          setConfirmPassword("");
          setPassword("");
        }
      } catch (error) {
        console.log(error);
        setIsOpen(true);
        setSeverity("error");
        setMessage("Wrong otp!");
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
      {loginPage && (
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
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p
                className="forgot-password text-right mt-2 text-secondary"
                onClick={handleForgotPasswordClick}
              >
                <a href="#" className="link-secondary pe-auto">
                  {" "}
                  Forgot password?
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
      {forgotPasswordPage && (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSendOtp}>
            <ArrowBackIcon
              className="text-secondary"
              onClick={() => {
                setLoginPage(true);
                setForgotPasswordPage(false);
                setOtpPage(false);
                setChangePasswordPage(false);
              }}
              style={{ cursor: "pointer" }}
            />

            <div className="Auth-form-content">
              <h3 className="Auth-form-title">OTP</h3>
              <div className="form-group mt-3">
                <label>Enter Email address</label>
                <Input
                  type="email"
                  className="mt-2"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon className="text-secondary" />
                    </InputAdornment>
                  }
                />
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Send otp
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {otpPage && (
        <OTPPage
          handleVerifyOtp={handleVerifyOtp}
          handleSendOtp={handleSendOtp}
          setLoginPage={setLoginPage}
          setForgotPasswordPage={setForgotPasswordPage}
          setChangePasswordPage={setChangePasswordPage}
          setOtp={setOtp}
          setOtpPage={setOtpPage}
          counter={counter}
          setCounter={setCounter}
        />
      )}
      {changePasswordPage && (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleChangePassword}>
            <ArrowBackIcon
              className="text-secondary"
              onClick={() => {
                setLoginPage(true);
                setForgotPasswordPage(false);
                setOtpPage(false);
                setChangePasswordPage(false);
              }}
              style={{ cursor: "pointer" }}
            />
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Change Password</h3>

              <div className="form-group mt-3">
                <label>Password</label>
                <br />
                <Input
                  type={visibilityChangePassword ? "text" : "password"}
                  className="mt-2"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon className="text-secondary" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {visibilityChangePassword ? (
                        <VisibilityIcon
                          className="text-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setVisibilityChangePassword(
                              !visibilityChangePassword
                            )
                          }
                        />
                      ) : (
                        <VisibilityOffIcon
                          className="text-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setVisibilityChangePassword(
                              !visibilityChangePassword
                            )
                          }
                        />
                      )}
                    </InputAdornment>
                  }
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <Input
                  type={visibilityChangePasswordConfirm ? "text" : "password"}
                  className=" mt-2"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon className="text-secondary" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {visibilityChangePasswordConfirm ? (
                        <VisibilityIcon
                          className="text-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setVisibilityChangePasswordConfirm(
                              !visibilityChangePasswordConfirm
                            )
                          }
                        />
                      ) : (
                        <VisibilityOffIcon
                          className="text-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setVisibilityChangePasswordConfirm(
                              !visibilityChangePasswordConfirm
                            )
                          }
                        />
                      )}
                    </InputAdornment>
                  }
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
