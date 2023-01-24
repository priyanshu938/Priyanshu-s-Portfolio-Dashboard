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
import EditSkillModal from "./EditSkillModal";
import url from "../../../ServerUrl";

const Skill = ({ id, image, skill, setIsOpen, setSeverity, setMessage }) => {
  const [open, setOpen] = useState(false);
  const [openEditSkillModal, setOpenEditSkillModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/skills/deleteSkill/${id}`, {
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
    <div className="my-5 mx-4 py-4">
      {openEditSkillModal && (
        <EditSkillModal
          openEditSkillModal={openEditSkillModal}
          setOpenEditSkillModal={setOpenEditSkillModal}
          setIsOpen={setIsOpen}
          setSeverity={setSeverity}
          setMessage={setMessage}
          id={id}
          image={image}
          skill={skill}
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
            Do you want to delete this skill (You cannot recover it later) ?
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
          alt="skill"
          src={image}
          style={{ width: "100%", height: "undefined", aspectRatio: 1 }}
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          className="mx-2 mt-2"
        >
          Skill : {skill}
        </Typography>
        <Stack direction="row" spacing={2} my={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            color='info'
            onClick={() => setOpenEditSkillModal(!openEditSkillModal)}
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

export default Skill;
