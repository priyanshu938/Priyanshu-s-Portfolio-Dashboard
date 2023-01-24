import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdSecurityUpdateGood } from "react-icons/md";
import TextField from "@mui/material/TextField";
import url from "../../../ServerUrl";
import style from '../../ReusableComponents/modalStyle'



const EditTestimonialContentModal = ({
  openEditTestimonialContentModal,
  setOpenEditTestimonialContentModal,
  setIsOpenSnackbar,
  setSeverity,
  setMessage,
  id,
  description,
  designation,
}) => {
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updateDesignation, setUpdateDesignation] = useState(designation);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      description: updateDescription,
      designation: updateDesignation,
    };
    try {
      const response = await fetch(`${url}/testimonial/editTestimonial/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setIsOpenSnackbar(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditTestimonialContentModal(!openEditTestimonialContentModal);
      }
    } catch (error) {
      setIsOpenSnackbar(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };
  return (
    <div>
      <Modal
        open={openEditTestimonialContentModal}
        onClose={() =>
          setOpenEditTestimonialContentModal(!openEditTestimonialContentModal)
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Edit Testimonial
          </Typography>
          <form className="mt-4" onSubmit={handleSubmitForm}>
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2 mt-2"
              multiline
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              required
            />
            <br />

            <TextField
              id="standard-basic"
              label="Designation"
              variant="standard"
              style={{ width: "30vw" }}
              type="text"
              className="ms-2 mt-2 mb-4"
              value={updateDesignation}
              onChange={(e) => setUpdateDesignation(e.target.value)}
              required
            />
            <br />
            <Button
              variant="contained"
              startIcon={<MdSecurityUpdateGood />}
              color='success'
              type="submit"
            >
              Update testimonial
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTestimonialContentModal;
