import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
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

export default function AddCertificateModal({
  openAddCertificateModal,
  setOpenAddCertificateModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      image: imageUrl,
      description: description,
      link: link,
    };
    try {
      const response = await fetch(`${Url}/certificates/addCertificate`, {
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
        setOpenAddCertificateModal(!openAddCertificateModal);
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
        open={openAddCertificateModal}
        onClose={() => setOpenAddCertificateModal(!openAddCertificateModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Add a Certificate
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <label htmlFor="">Name : </label>
            <Input
              type="text"
              className="ms-2 "
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="">Image : </label>
            <Input
              type="url"
              className="ms-2 my-4"
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />{" "}
            <br />
            <label htmlFor="">Description : </label>
            <Input
              type="text"
              className="ms-2 "
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
            <label htmlFor="">Link : </label>
            <Input
              type="url"
              className="ms-2 my-4"
              onChange={(e) => setLink(e.target.value)}
              required
            />
            <br />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              Add a Certificate
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
