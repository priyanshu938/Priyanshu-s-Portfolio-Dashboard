import React, { useState } from "react";
import "./Login.css";
import url from "../../ServerUrl";
import Snackbar from "../ReusableComponents/Snackbar";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      }
    } catch (error) {
      console.log(error);
      setIsOpen(true);
      setSeverity("error");
      setMessage("User does not exist!");
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
        setMessage("Otp verified successfully!");
        setLoginPage(false);
        setForgotPasswordPage(false);
        setOtpPage(false);
        setChangePasswordPage(true);
      }
    } catch (error) {
      console.log(error);
      setIsOpen(true);
      setSeverity("error");
      setMessage("Wrong otp!");
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
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
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
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleVerifyOtp}>
            <ArrowBackIcon
              onClick={() => {
                setLoginPage(false);
                setForgotPasswordPage(true);
                setOtpPage(false);
                setChangePasswordPage(false);
              }}
              style={{ cursor: "pointer" }}
            />
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">OTP</h3>
              <div className="form-group mt-3">
                <label>Enter otp</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter otp"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Verify otp
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {changePasswordPage && (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleChangePassword}>
            <ArrowBackIcon
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
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
