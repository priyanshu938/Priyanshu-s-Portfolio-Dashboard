import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import { Typography, Button, Link, Grid } from "@mui/material";
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
    <Grid item xs={12} sm={12} md={6} lg={6} my={2}>
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

      <Card sx={{ maxWidth: 500 }} key={id}>
        <CardActionArea>
          {youtubeVideoLink ? (
            <iframe
              className="iframeSet"
              height="250px"
              width="500px"
              src={youtubeVideoLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <CardMedia component="img" height="300" image={image} alt={title} />
          )}

          <CardContent>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h5"
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
                  <GitHubIcon color="primary" />
                </Link>
              )}
              {youtubeVideoLink !== "" && (
                <Link href={youtubeVideoLink} target="_blank" underline="none">
                  <YouTubeIcon color="error" />
                </Link>
              )}
              {liveProjectLink !== "" && (
                <Link href={liveProjectLink} target="_blank" underline="none">
                  <PreviewIcon color="warning" />
                </Link>
              )}
            </Stack>
            <CardActions>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="info"
                    onClick={() =>
                      setOpenEditProjectModal(!openEditProjectModal)
                    }
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={handleClickOpen}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Project;
