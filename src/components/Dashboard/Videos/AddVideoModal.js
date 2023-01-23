import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Url from "../../../ServerUrl";
import style from '../../ReusableComponents/modalStyle'



export default function AddVideoModal({
  openAddVideoModal,
  setOpenAddVideoModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      link: link,
    };
    try {
      const response = await fetch(`${Url}/videos/addVideo`, {
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
        setOpenAddVideoModal(!openAddVideoModal);
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
        open={openAddVideoModal}
        onClose={() => setOpenAddVideoModal(!openAddVideoModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Add a Video
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              type="text"
              className="ms-2 "
              id="standard-basic"
              label="Title"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
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
              Add a Video
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
