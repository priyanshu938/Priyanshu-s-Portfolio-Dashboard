import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
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
            <label htmlFor="">Name : </label>
            <Input
              type="text"
              className="ms-2 "
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="">Image : </label>
            <Input
              type="url"
              className="ms-2 my-4"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />{" "}
            <br />
            <label htmlFor="">Description : </label>
            <Input
              type="text"
              className="ms-2 "
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              required
            />
            <br />
            <label htmlFor="">Link : </label>
            <Input
              type="url"
              className="ms-2 my-4"
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
              Update Certificate
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
