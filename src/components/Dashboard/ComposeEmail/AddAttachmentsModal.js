import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Url from "../../../ServerUrl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

export default function AddAttachmentsModal({
  openAddAttachmentsModal,
  setAddAttachmentsModal,
  attachments,
  setAttachments,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const [files, setFiles] = useState("");
  const uploadFileHandler = (event) => {
    setFiles(event.target.files);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (files.length > 0) {
      const formData = new FormData();
      let size = 0;
      for (let i = 0; i < files.length; i++) {
        size += files[i].size;
        if (size > 52428800) {
          setSeverity("error");
          setMessage("Total file size should be less than 50MB!");
          setIsOpen(true);
          return;
        }

        formData.append(`files`, files[i]);
      }

      try {
        const response = await fetch(
          `${Url}/emailViaForm/addEmailAttachments`,
          {
            method: "POST",
            headers: {
              "auth-token": window.localStorage.getItem("token"),
            },
            body: formData,
          }
        );
        const json = await response.json();
        if (response.status === 201) {
          console.log(json.message);
          setAttachments(json.attachments);
          setIsOpen(true);
          setSeverity("success");
          setMessage(json.message);
          setAddAttachmentsModal(!openAddAttachmentsModal);
        } else {
          setIsOpen(true);
          setSeverity("error");
          setMessage("This email id already exists!");
        }
      } catch (error) {
        setIsOpen(true);
        setSeverity("error");
        setMessage("Auth failed! Plz logout and re-login.");
      }
    } else {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Please select a file!");
    }
  };

  return (
    <div>
      <Modal
        open={openAddAttachmentsModal}
        onClose={() => setAddAttachmentsModal(!openAddAttachmentsModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Add Attachments
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <input
              type="file"
              name="files"
              id=""
              multiple
              onChange={uploadFileHandler}
            />
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ backgroundColor: "sky-blue" }}
              type="submit"
            >
              Upload
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
