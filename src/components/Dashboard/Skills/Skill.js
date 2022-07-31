import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
const Skill = ({ id, image,skill }) => {
  return (
    <div className="my-5 mx-4">
      {" "}
      <ImageListItem key={id}>
        <img
          src={image}
          style={{ width: "100%", height: "undefined", aspectRatio: 1 }}
        />
        <Typography id="modal-modal-title" variant="h6" component="h6" className="mx-2 mt-2">
       Skill : {skill}
      </Typography>
        <Stack direction="row" spacing={2} my={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            style={{ backgroundColor: "gray" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </Button>
        </Stack>
      </ImageListItem>
    </div>
  );
};

export default Skill;
