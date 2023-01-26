import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
const ForgotPasswordPage = ({
  handleSendOtp,
  setLoginPage,
  setForgotPasswordPage,
  setOtpPage,
  setChangePasswordPage,
  setEmail,
}) => {
  return (
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
              required
              onChange={(e) => setEmail(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon className="text-secondary" />
                </InputAdornment>
              }
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#1976D2", color: "white" }}
            >
              Send otp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
