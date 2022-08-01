import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import Skill from "./Skill";
import url from "../../../ServerUrl";
import { Typography, Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddSkillModal from "./AddSkillModal";
import Snackbar from "../../ReusableComponents/Snackbar";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [openAddSkillModal, setOpenAddSkillModal] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  //Below useEffect will be called whenever value of isOpen will be changed
  useEffect(() => getAllSkills, [isOpen]);

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
      <Snackbar
        isOpen={isOpen}
        severity={severity}
        message={message}
        setIsOpen={setIsOpen}
      />
      {openAddSkillModal && (
        <AddSkillModal
          openAddSkillModal={openAddSkillModal}
          setOpenAddSkillModal={setOpenAddSkillModal}
          setIsOpen={setIsOpen}
          setSeverity={setSeverity}
          setMessage={setMessage}
        />
      )}
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
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ backgroundColor: "green" }}
        onClick={() => setOpenAddSkillModal(!openAddSkillModal)}
      >
        Add skill
      </Button>
      {skills.length > 0 ? (
        <ImageList
          sx={{
            width: 1050,
            height: 400,
            "&::-webkit-scrollbar": { display: "none" },
          }}
          cols={4}
          rowHeight={240}
        >
          {skills.map((skill) => (
            <Skill
              key={skill._id}
              id={skill._id}
              image={skill.image}
              skill={skill.skill}
              setIsOpen={setIsOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
            />
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
