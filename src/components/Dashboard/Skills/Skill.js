import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
const Skill = ({ id, image }) => {
  return (
    <div className="my-5">
      {" "}
      <ImageListItem key={id}>
        <img
          src={image}
          style={{ width: "100%", height: "undefined", aspectRatio: 1 }}
        />
        <Stack direction="row" spacing={2} my={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            style={{ backgroundColor: "green" }}
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
