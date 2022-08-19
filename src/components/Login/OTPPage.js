import React, { useEffect } from "react";
import "./Login.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";

const OTPPage = ({
  handleVerifyOtp,
  handleSendOtp,
  setLoginPage,
  setForgotPasswordPage,
  setChangePasswordPage,
  setOtp,
  setOtpPage,
  counter,
  setCounter,
}) => {
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div>
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
            className="text-secondary"
          />
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">OTP</h3>
            <p>An otp has been sent to pri*************789@gmail.com</p>
            <div className="form-group mt-3">
              <label>Enter otp</label>
              <br />
              <Input
                type="text"
                className=" mt-2"
                placeholder="Enter otp"
                onChange={(e) => setOtp(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon className="text-secondary" />
                  </InputAdornment>
                }
              />
            </div>
            {counter > 0 ? (
              <div
                className="my-4"
                style={{ color: counter > 10 ? "grey" : "red" }}
              >
                Your otp will expire in <b>{counter}</b> seconds.
              </div>
            ) : (
              <div
                className="my-4"
                style={{ color: "green", cursor: "pointer" }}
                onClick={handleSendOtp}
              >
                Resend OTP ?
              </div>
            )}

            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "teal", color: "white" }}
              >
                Verify otp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
