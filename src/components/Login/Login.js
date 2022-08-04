import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import url from "../../ServerUrl";
import Snackbar from "../ReusableComponents/Snackbar";
import axios from "axios";
import OTPPage from "./OTPPage";
import LoginPage from "./LoginPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ChangePasswordPage from "./ChangePasswordPage";

const Login = () => {
  let navigate = useNavigate();
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
          window.localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
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
        <LoginPage
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          visibilityLoginPassword={visibilityLoginPassword}
          setVisibilityLoginPassword={setVisibilityLoginPassword}
          handleForgotPasswordClick={handleForgotPasswordClick}
        />
      )}
      {forgotPasswordPage && (
        <ForgotPasswordPage
          handleSendOtp={handleSendOtp}
          setLoginPage={setLoginPage}
          setForgotPasswordPage={setForgotPasswordPage}
          setOtpPage={setOtpPage}
          setChangePasswordPage={setChangePasswordPage}
          setEmail={setEmail}
        />
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
        <ChangePasswordPage
          handleChangePassword={handleChangePassword}
          setLoginPage={setLoginPage}
          setForgotPasswordPage={setForgotPasswordPage}
          setOtpPage={setOtpPage}
          setChangePasswordPage={setChangePasswordPage}
          visibilityChangePassword={visibilityChangePassword}
          setPassword={setPassword}
          setVisibilityChangePassword={setVisibilityChangePassword}
          visibilityChangePasswordConfirm={visibilityChangePasswordConfirm}
          setConfirmPassword={setConfirmPassword}
          setVisibilityChangePasswordConfirm={
            setVisibilityChangePasswordConfirm
          }
        />
      )}
    </div>
  );
};

export default Login;
