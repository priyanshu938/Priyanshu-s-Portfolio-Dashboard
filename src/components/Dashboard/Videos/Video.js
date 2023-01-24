import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EditVideoModal from "./EditVideoModal";
import Url from "../../../ServerUrl";
const Video = ({
  id,
  title,
  description,
  link,
  setIsOpen,
  setSeverity,
  setMessage,
}) => {
  const [open, setOpen] = useState(false);
  const [openEditVideoModal, setOpenEditVideoModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${Url}/videos/deletevideo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setOpen(false);
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
      }
    } catch (error) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };
  return (
    <div className="mx-4 my-4">
      {openEditVideoModal && (
        <EditVideoModal
          openEditVideoModal={openEditVideoModal}
          setOpenEditVideoModal={setOpenEditVideoModal}
          setIsOpen={setIsOpen}
          setSeverity={setSeverity}
          setMessage={setMessage}
          id={id}
          title={title}
          description={description}
          link={link}
        />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this video (You cannot recover it later) ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
      <ImageListItem key={id}>
        <iframe
          className="iframeSet"
          height="100%"
          width="450px"
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          className="mx-2 mt-2"
        >
          {title}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="p"
          component="p"
          className="mx-2 mt-2"
        >
          {description}
        </Typography>
        <Stack direction="row" spacing={2} my={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            color='info'
            onClick={() => setOpenEditVideoModal(!openEditVideoModal)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            color='error'
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </Stack>
      </ImageListItem>
    </div>
  );
};

export default Video;
