import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Button, Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EditWorkModal from "./EditWorkModal";
import Url from "../../../ServerUrl";
const Work = ({
  id,
  name,
  image,
  description,
  url,
  setIsOpen,
  setSeverity,
  setMessage,
}) => {
  const [open, setOpen] = useState(false);
  const [openEditWorkModal, setOpenEditWorkModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${Url}/works/deleteWork/${id}`, {
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
      {openEditWorkModal && (
        <EditWorkModal
          openEditWorkModal={openEditWorkModal}
          setOpenEditWorkModal={setOpenEditWorkModal}
          setIsOpen={setIsOpen}
          setSeverity={setSeverity}
          setMessage={setMessage}
          id={id}
          name={name}
          image={image}
          description={description}
          url={url}
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
            Do you want to delete this work (You cannot recover it later) ?
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
        <img
        alt="work"
          src={image}
          style={{ width: "100%", height: "30vh", aspectRatio: 1 }}
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          className="mx-2 mt-2"
        >
          {name}
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
          <Link href={url} target="_blank" underline="none">
            <Button className="" variant="contained" endIcon={<LaunchIcon />}>
              Watch
            </Button>
          </Link>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            style={{ backgroundColor: "gray" }}
            onClick={() => setOpenEditWorkModal(!openEditWorkModal)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            style={{ backgroundColor: "red" }}
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </Stack>
      </ImageListItem>
    </div>
  );
};

export default Work;
