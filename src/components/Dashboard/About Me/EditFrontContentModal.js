import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdSecurityUpdateGood } from "react-icons/md";
import TextField from "@mui/material/TextField";
import url from "../../../ServerUrl";

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
const EditFrontContentModal = ({
  openEditFrontContentModal,
  setOpenEditFrontContentModal,
  setIsOpenSnackbar,
  setSeverity,
  setMessage,
  id,
  image,
  description,
  link,
}) => {
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updateLink, setUpdateLink] = useState(link);
  const [imageUrl, setImageUrl] = useState(image);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      image: imageUrl,
      description: updateDescription,
      link: updateLink,
    };
    try {
      const response = await fetch(`${url}/resume/editResume/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setIsOpenSnackbar(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditFrontContentModal(!openEditFrontContentModal);
      }
    } catch (error) {
      setIsOpenSnackbar(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };
  return (
    <div>
      <Modal
        open={openEditFrontContentModal}
        onClose={() => setOpenEditFrontContentModal(!openEditFrontContentModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Edit Details
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2"
              value="Hello, I am 
          Priyanshu Tiwari"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2 mt-2"
              multiline
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="ImageURL"
              variant="standard"
              style={{ width: "30vw" }}
              type="url"
              className="ms-2 mt-2"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="Resume Link"
              variant="standard"
              style={{ width: "30vw" }}
              type="url"
              className="ms-2 mt-2 mb-4"
              value={updateLink}
              onChange={(e) => setUpdateLink(e.target.value)}
              required
            />
            <br />
            <Button
              variant="contained"
              startIcon={<MdSecurityUpdateGood />}
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              Update details
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditFrontContentModal;
