import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdSecurityUpdateGood } from "react-icons/md";
import TextField from "@mui/material/TextField";
import Url from "../../../ServerUrl";

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
const EditProjectModal = ({
  openEditProjectModal,
  setOpenEditProjectModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  image,
  title,
  description,
  githubLink,
  liveProjectLink,
  youtubeVideoLink,
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updateGithubLink, setUpdateGithubLink] = useState(githubLink);
  const [updateLiveProjectLink, setUpdateLiveProjectLink] =
    useState(liveProjectLink);
  const [updateYoutubeVideoLink, setUpdateYoutubeVideoLink] =
    useState(youtubeVideoLink);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      image: imageUrl,
      title: updateTitle,
      description: updateDescription,
      githubLink: updateGithubLink,
      liveProjectLink: updateLiveProjectLink,
      youtubeVideoLink: updateYoutubeVideoLink,
    };
    try {
      const response = await fetch(`${Url}/projects/editProject/${id}`, {
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
        setOpenEditProjectModal(!openEditProjectModal);
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
        open={openEditProjectModal}
        onClose={() => setOpenEditProjectModal(!openEditProjectModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Edit Project
          </Typography>
          <form className="mt-2" onSubmit={handleSubmitForm}>
            <TextField
              type="text"
              className="ms-2 "
              id="standard-basic"
              label="Project Title"
              variant="standard"
              style={{ width: "30vw" }}
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
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
              value={updateDescription}
              id="standard-basic"
              label="Description"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setUpdateDescription(e.target.value)}
              multiline
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 mt-2"
              value={updateGithubLink}
              id="standard-basic"
              label="Github Link"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setUpdateGithubLink(e.target.value)}
              required
            />
            <br />
            <TextField
              type="url"
              className="ms-2 mt-2"
              value={updateLiveProjectLink}
              id="standard-basic"
              label="Live Project Link"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setUpdateLiveProjectLink(e.target.value)}
            />
            <br />
            <TextField
              type="url"
              className="ms-2 mt-2 mb-4"
              value={updateYoutubeVideoLink}
              id="standard-basic"
              label="Youtube Video Link"
              variant="standard"
              style={{ width: "30vw" }}
              onChange={(e) => setUpdateYoutubeVideoLink(e.target.value)}
            />
            <br />
            <Button
              variant="contained"
              startIcon={<MdSecurityUpdateGood />}
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              Update Project
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProjectModal;
