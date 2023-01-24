import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import url from "../../../ServerUrl";
import style from '../../ReusableComponents/modalStyle';


export default function AddSkillModal({
  openAddSkillModal,
  setOpenAddSkillModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const [skill, setSkill] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      skill: skill,
      image: imageUrl,
    };
    try {
      const response = await fetch(`${url}/skills/addSkill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 201) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenAddSkillModal(!openAddSkillModal);
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
        open={openAddSkillModal}
        onClose={() => setOpenAddSkillModal(!openAddSkillModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Add a Skill
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              id="standard-basic"
              label="Skill name"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2 "
              onChange={(e) => setSkill(e.target.value)}
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="ImageURL"
              variant="standard"
              style={{ width: "30vw" }}
              type="url"
              className="ms-2 my-4"
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <br />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color='success'
              type="submit"
            >
              Add skill
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
