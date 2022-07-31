import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
const ChangePasswordPage = ({
  handleChangePassword,
  setLoginPage,
  setForgotPasswordPage,
  setOtpPage,
  setChangePasswordPage,
  visibilityChangePassword,
  setPassword,
  setVisibilityChangePassword,
  visibilityChangePasswordConfirm,
  setConfirmPassword,
  setVisibilityChangePasswordConfirm,
}) => {
  return (
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
                        setVisibilityChangePassword(!visibilityChangePassword)
                      }
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setVisibilityChangePassword(!visibilityChangePassword)
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
  );
};

export default ChangePasswordPage;
