import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdSecurityUpdateGood } from "react-icons/md";
import TextField from "@mui/material/TextField";
import Url from "../../../ServerUrl";
import style from '../../ReusableComponents/modalStyle'



export default function EditCertificateModal({
  openEditCertificateModal,
  setOpenEditCertificateModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  name,
  image,
  description,
  link,
}) {
  const [updateName, setUpdateName] = useState(name);
  const [imageUrl, setImageUrl] = useState(image);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updateLink, setUpdateLink] = useState(link);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      name: updateName,
      image: imageUrl,
      description: updateDescription,
      link: updateLink,
    };
    try {
      const response = await fetch(
        `${Url}/certificates/editCertificate/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "auth-token": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditCertificateModal(!openEditCertificateModal);
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
        open={openEditCertificateModal}
        onClose={() => setOpenEditCertificateModal(!openEditCertificateModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Edit Certificate
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              type="text"
              className="ms-2 "
              id="standard-basic"
              label="Name"
              variant="standard"
              style={{ width: "30vw" }}
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 my-4"
              value={imageUrl}
              id="standard-basic"
              label="ImageURL"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />{" "}
            <br />
            <TextField
              type="text"
              className="ms-2 "
              value={updateDescription}
              id="standard-basic"
              label="Description"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setUpdateDescription(e.target.value)}
              multiline
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 my-4"
              value={updateLink}
              id="standard-basic"
              label="Link"
              variant="standard"
              style={{ width: "30vw" }}
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
              Update Certificate
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
