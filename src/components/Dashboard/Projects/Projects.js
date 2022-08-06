import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import Project from "./Project";
import url from "../../../ServerUrl";
import { Typography, Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddProjectModal from "./AddProjectModal";
import Snackbar from "../../ReusableComponents/Snackbar";
import Spinner from "../../ReusableComponents/Spinner";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProjects = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/projects/getAllProjectsDashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setProjects(json.result);
    setAllProjects(json.result);
    setIsLoading(false);
  };
  const handleSearchChange = (e) => {
    const searchVal = e.target.value;
    searchVal.length > 0
      ? setProjects(
          allProjects.filter((project) =>
            project.title.toLowerCase().includes(searchVal.toLowerCase())
          )
        )
      : setProjects(allProjects);
  };
  //Below useEffect will be called whenever value of isOpen will be changed
  useEffect(() => {
    getAllProjects();
  }, [isOpen]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          <Snackbar
            isOpen={isOpen}
            severity={severity}
            message={message}
            setIsOpen={setIsOpen}
          />
          {openAddProjectModal && (
            <AddProjectModal
              openAddProjectModal={openAddProjectModal}
              setOpenAddProjectModal={setOpenAddProjectModal}
              setIsOpen={setIsOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
            />
          )}
          <Typography px={2} variant="h4" component="div" gutterBottom>
            My Projects
          </Typography>
          <Input
            type="text"
            className="mt-1 mx-4"
            placeholder="Search project..."
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
            onClick={() => setOpenAddProjectModal(!openAddProjectModal)}
          >
            Add a Project
          </Button>

          {projects.length > 0 ? (
            <ImageList
              sx={{
                width: 1000,
                height: 450,
                "&::-webkit-scrollbar": { display: "none" },
              }}
              cols={2}
              rowHeight={500}
            >
              {projects.map((project) => (
                <Project
                  key={project._id}
                  id={project._id}
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  githubLink={project.githubLink}
                  liveProjectLink={project.liveProjectLink}
                  youtubeVideoLink={project.youtubeVideoLink}
                  setIsOpen={setIsOpen}
                  setSeverity={setSeverity}
                  setMessage={setMessage}
                />
              ))}
            </ImageList>
          ) : (
            <Typography px={2} my={4} variant="h6" component="div" gutterBottom>
              No Project found !
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
