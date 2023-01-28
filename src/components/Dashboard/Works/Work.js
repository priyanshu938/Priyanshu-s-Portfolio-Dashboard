import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import { Typography, Button, Link, Grid } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  callUseEffect,
  setCallUseEffect,
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

      <Card sx={{ maxWidth: 500 }} key={id}>
        <CardActionArea>
          <CardMedia component="img" height="250" image={image} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="span" component="div">
              {description}
            </Typography>
            <CardActions>
              <Grid container spacing={3}>
                <Grid item>
                  <Link href={url} target="_blank" underline="none">
                    <Button
                      className=""
                      variant="contained"
                      endIcon={<LaunchIcon />}
                    >
                      Watch
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="info"
                    onClick={() => setOpenEditWorkModal(!openEditWorkModal)}
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

export default Work;
