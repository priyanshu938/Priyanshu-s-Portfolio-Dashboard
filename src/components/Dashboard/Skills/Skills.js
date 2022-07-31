import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import Skill from "./Skill";
import url from "../../../ServerUrl";
import { Typography } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [search, setSearch] = useState("");
  const getAllSkills = async () => {
    const response = await fetch(`${url}/skills/getAllSkills`, {
      method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "auth-token": window.localStorage.getItem("token"),
      //   },
    });
    const json = await response.json();
    setAllSkills(json.result);
    setSkills(json.result);
  };
  useEffect(() => getAllSkills, []);

  const handleSearchChange = (e) => {
    const searchVal = e.target.value;
    searchVal.length > 0
      ? setSkills(
          allSkills.filter((skill) =>
            skill.skill.toLowerCase().includes(searchVal.toLowerCase())
          )
        )
      : setSkills(allSkills);
  };
  return (
    <div className=" mt-4">
      <Typography px={2} variant="h4" component="div" gutterBottom>
        My Skills
      </Typography>
      <Input
        type="text"
        className="mt-1 mx-4"
        placeholder="Search skill..."
        onChange={handleSearchChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon className="text-secondary" />
          </InputAdornment>
        }
      />
      {skills.length > 0 ? (
        <ImageList
          sx={{
            width: 1000,
            height: 400,
            "&::-webkit-scrollbar": { display: "none" },
          }}
          cols={5}
          rowHeight={200}
        >
          {skills.map((skill) => (
            <Skill key={skill.id} id={skill.id} image={skill.image} />
          ))}
        </ImageList>
      ) : (
        <Typography px={2} my={4} variant="h6" component="div" gutterBottom>
          No skills found
        </Typography>
      )}
    </div>
  );
}
