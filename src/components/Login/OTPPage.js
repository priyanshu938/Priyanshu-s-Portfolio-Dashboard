import React, { useEffect } from "react";
import "./Login.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  ChakraProvider,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";

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
  }, [counter, setCounter]);
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
              <ChakraProvider>
                <HStack spacing="1rem" className="mt-2">
                  <PinInput otp size="lg" onChange={(e) => setOtp(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </ChakraProvider>
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
                style={{ backgroundColor: "#1976D2", color: "white" }}
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
