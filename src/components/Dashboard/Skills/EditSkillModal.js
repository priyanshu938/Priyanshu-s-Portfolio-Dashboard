import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {MdSecurityUpdateGood} from "react-icons/md";
import url from "../../../ServerUrl";

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
            <label htmlFor="">Skill name : </label>
            <Input
              type="text"
              className="ms-2"
              value={updateSkill}
              onChange={(e) => setUpdateSkill(e.target.value)}
              required
            />
            <br />
            <label htmlFor="">Image url : </label>
            <Input
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
              style={{ backgroundColor: "green" }}
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
