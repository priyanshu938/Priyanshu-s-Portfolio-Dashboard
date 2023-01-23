import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Url from "../../../ServerUrl";
import style from '../../ReusableComponents/modalStyle'


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
            <TextField
              type="text"
              className="ms-2 "
              id="standard-basic"
              label="Name"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 my-4"
              id="standard-basic"
              label="ImageURL"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />{" "}
            <br />
            <TextField
              type="textarea"
              className="ms-2 mt-2"
              id="standard-basic"
              label="Description"
              variant="standard"
              multiline
              style={{ width: "30vw" }}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 my-4"
              id="standard-basic"
              label="Link"
              variant="standard"
              style={{ width: "30vw" }}
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
