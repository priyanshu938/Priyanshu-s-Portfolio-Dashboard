import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Button, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EditProjectModal from "./EditProjectModal";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PreviewIcon from "@mui/icons-material/Preview";

import Url from "../../../ServerUrl";

const Project = ({
  id,
  image,
  title,
  description,
  githubLink,
  liveProjectLink,
  youtubeVideoLink,
  setIsOpen,
  setSeverity,
  setMessage,
}) => {
  const [open, setOpen] = useState(false);
  const [openEditProjectModal, setOpenEditProjectModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${Url}/projects/deleteProject/${id}`, {
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
    <div className="my-4 mr-2">
      {openEditProjectModal && (
        <EditProjectModal
          openEditProjectModal={openEditProjectModal}
          setOpenEditProjectModal={setOpenEditProjectModal}
          setIsOpen={setIsOpen}
          setSeverity={setSeverity}
          setMessage={setMessage}
          id={id}
          image={image}
          title={title}
          description={description}
          githubLink={githubLink}
          liveProjectLink={liveProjectLink}
          youtubeVideoLink={youtubeVideoLink}
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
            Do you want to delete this project (You cannot recover it later) ?
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
        {youtubeVideoLink ? (
          <iframe
            className="iframeSet"
            height="100%"
            width="500px"
            src={youtubeVideoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            alt="Project"
            src={image}
            style={{height: "30vh", aspectRatio: 1 }}
          />
        )}

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
          {githubLink !== "" && (
            <Link href={githubLink} target="_blank" underline="none">
              <GitHubIcon style={{ color: "black" }} />
            </Link>
          )}
          {youtubeVideoLink !== "" && (
            <Link href={youtubeVideoLink} target="_blank" underline="none">
              <YouTubeIcon style={{ color: "red" }} />
            </Link>
          )}
          {liveProjectLink !== "" && (
            <Link href={liveProjectLink} target="_blank" underline="none">
              <PreviewIcon style={{ color: "gray" }} />
            </Link>
          )}
        </Stack>
        <Stack direction="row" spacing={2} my={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            style={{ backgroundColor: "gray" }}
            onClick={() => setOpenEditProjectModal(!openEditProjectModal)}
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

export default Project;
