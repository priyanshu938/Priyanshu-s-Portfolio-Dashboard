import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import { Typography, Button, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  callUseEffect,
  setCallUseEffect,
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
        setCallUseEffect(!callUseEffect);
      }
    } catch (error) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} my={2}>
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
          callUseEffect={callUseEffect}
          setCallUseEffect={setCallUseEffect}
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

      <Card sx={{ maxWidth: 500 }} key={id}>
        <CardActionArea>
          <iframe
            className="iframeSet"
            height="250px"
            width="500px"
            src={link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

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
            <CardActions>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="info"
                    onClick={() => setOpenEditVideoModal(!openEditVideoModal)}
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

export default Video;
