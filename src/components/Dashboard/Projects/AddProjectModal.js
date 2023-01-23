import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MdSecurityUpdateGood } from "react-icons/md";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Url from "../../../ServerUrl";
import style from '../../ReusableComponents/modalStyle'


const AddProjectModal = ({
  openAddProjectModal,
  setOpenAddProjectModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [liveProjectLink, setLiveProjectLink] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      image: imageUrl,
      description: description,
      githubLink: githubLink,
      youtubeVideoLink: youtubeVideoLink,
      liveProjectLink: liveProjectLink,
    };
    try {
      const response = await fetch(`${Url}/projects/addProject`, {
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
        setOpenAddProjectModal(!openAddProjectModal);
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
        open={openAddProjectModal}
        onClose={() => setOpenAddProjectModal(!openAddProjectModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Add a Project
          </Typography>
          <form className="mt-2" onSubmit={handleSubmitForm}>
            <TextField
              type="text"
              className="ms-2 "
              id="standard-basic"
              label="Project Title"
              variant="standard"
              style={{ width: "30vw" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 mt-2"
              value={imageUrl}
              id="standard-basic"
              label="ImageURL"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />{" "}
            <br />
            <TextField
              type="text"
              className="ms-2 mt-2 "
              value={description}
              id="standard-basic"
              label="Description"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 mt-2"
              value={githubLink}
              id="standard-basic"
              label="Github Link"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setGithubLink(e.target.value)}
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 mt-2"
              value={liveProjectLink}
              id="standard-basic"
              label="Live Project Link"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setLiveProjectLink(e.target.value)}
            />
            <br />
            <TextField
              type="url"
              className="ms-2 mt-2 mb-4"
              value={youtubeVideoLink}
              id="standard-basic"
              label="Youtube Video Link"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setYoutubeVideoLink(e.target.value)}
            />
            <br />
            <Button
              variant="contained"
              startIcon={<MdSecurityUpdateGood />}
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              Add Project
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProjectModal;
