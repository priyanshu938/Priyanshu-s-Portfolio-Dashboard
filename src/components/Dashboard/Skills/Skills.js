import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import Skill from "./Skill";
import url from "../../../ServerUrl";
import { Typography } from "@mui/material";
export default function Skills() {
  const [skills, setSkills] = useState([]);
  const getAllSkills = async () => {
    const response = await fetch(`${url}/skills/getAllSkills`, {
      method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "auth-token": window.localStorage.getItem("token"),
      //   },
    });
    const json = await response.json();
    setSkills(json.result);
  };
  useEffect(() => getAllSkills, []);

  return (
    <div className=" mt-4">
      <Typography px={2} variant="h4" component="div" gutterBottom>
        My Skills
      </Typography>
      <ImageList sx={{ width: 1000, height: 500 }} cols={5} rowHeight={200}>
        {skills.map((skill) => (
          <Skill key={skill.id} id={skill.id} image={skill.image} />
        ))}
      </ImageList>
    </div>
  );
}
