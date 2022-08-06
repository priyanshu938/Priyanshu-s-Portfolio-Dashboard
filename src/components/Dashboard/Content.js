import React from "react";
import { Box } from "@mui/material";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";
import Certificates from "./Certificates/Certificates";
import Works from "./Works/Works";
import AboutMe from "./About Me/AboutMe";
import Contact from "./ContactUsMessages/Contact";
import Videos from "./Videos/Videos";
const Content = ({ content }) => {
  return (
    <Box flex={5} justifyContent="center">
      {content === "about-me" && <AboutMe />}
      {content === "skills" && <Skills />}
      {content === "projects" && <Projects />}
      {content === "certificates" && <Certificates />}
      {content === "videos" && <Videos />}
      {content === "works" && <Works />}
      {content === "contact" && <Contact />}
    </Box>
  );
};

export default Content;
