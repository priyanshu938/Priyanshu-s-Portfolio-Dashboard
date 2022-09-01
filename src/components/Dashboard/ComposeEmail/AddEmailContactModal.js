import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Url from "../../../ServerUrl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  border: "solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddEmailContactModal({
  openAddEmailContactModal,
  setAddEmailContactModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const [email, setEmail] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    try {
      const response = await fetch(`${Url}/emailViaForm/addEmailContact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 201) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setAddEmailContactModal(!openAddEmailContactModal);
      } else {
        setIsOpen(true);
        setSeverity("error");
        setMessage("This email id already exists!");
      }
    } catch (error) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };

  return (
    <div>
      <Modal
        open={openAddEmailContactModal}
        onClose={() => setAddEmailContactModal(!openAddEmailContactModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Add Email
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              type="email"
              className="ms-2 "
              id="standard-basic"
              label="Write Email id"
              variant="standard"
              style={{ width: "30vw", marginBottom: "5vh" }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              Add Email
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
