import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdSecurityUpdateGood } from "react-icons/md";
import TextField from "@mui/material/TextField";
import url from "../../../ServerUrl";
import style from '../../ReusableComponents/modalStyle'



export default function EditSkillModal({
  openEditSkillModal,
  setOpenEditSkillModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  image,
  skill,
}) {
  const [updateSkill, setUpdateSkill] = useState(skill);
  const [imageUrl, setImageUrl] = useState(image);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      skill: updateSkill,
      image: imageUrl,
    };
    try {
      const response = await fetch(`${url}/skills/editSkill/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditSkillModal(!openEditSkillModal);
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
        open={openEditSkillModal}
        onClose={() => setOpenEditSkillModal(!openEditSkillModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Edit Skill
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              id="standard-basic"
              label="Skill name"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2"
              value={updateSkill}
              onChange={(e) => setUpdateSkill(e.target.value)}
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
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <br />
            <Button
              variant="contained"
              startIcon={<MdSecurityUpdateGood />}
              color='success'
              type="submit"
            >
              Update skill
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
