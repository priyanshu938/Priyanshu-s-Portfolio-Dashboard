import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdSecurityUpdateGood } from "react-icons/md";
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

export default function EditWorkModal({
  openEditWorkModal,
  setOpenEditWorkModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  name,
  image,
  description,
  url,
}) {
  const [updateName, setUpdateName] = useState(name);
  const [imageUrl, setImageUrl] = useState(image);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updateUrl, setUpdateUrl] = useState(url);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      name: updateName,
      image: imageUrl,
      description: updateDescription,
      url: updateUrl,
    };
    try {
      const response = await fetch(`${Url}/works/editWork/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditWorkModal(!openEditWorkModal);
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
        open={openEditWorkModal}
        onClose={() => setOpenEditWorkModal(!openEditWorkModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Edit Work Experience
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2 "
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="Image"
              variant="standard"
              style={{ width: "30vw" }}
              type="url"
              className="ms-2 my-4"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />{" "}
            <br />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2 "
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              multiline
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="Link"
              variant="standard"
              style={{ width: "30vw" }}
              type="url"
              className="ms-2 my-4"
              value={updateUrl}
              onChange={(e) => setUpdateUrl(e.target.value)}
              required
            />
            <br />
            <Button
              variant="contained"
              startIcon={<MdSecurityUpdateGood />}
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              Update Work Experience
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
