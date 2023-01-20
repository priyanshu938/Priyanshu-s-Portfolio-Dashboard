import React from "react";
import { Box } from "@mui/material";
import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";
import Certificates from "./Certificates/Certificates";
import Works from "./Works/Works";
import AboutMe from "./About Me/AboutMe";
import Contact from "./ContactUsMessages/Contact";
import Videos from "./Videos/Videos";
import ComposeEmail from "./ComposeEmail/ComposeEmail";
import Chatbot from "./Chatbot";
const Content = ({ content }) => {
  //to add new content, add the name of the content in the contentArray
  const contentArray = {
    "about-me": <AboutMe />,
    chatbot: <Chatbot />,
    "compose-email": <ComposeEmail />,
    skills: <Skills />,
    projects: <Projects />,
    certificates: <Certificates />,
    videos: <Videos />,
    "work experience": <Works />,
    messages: <Contact />,
  };
  return (
    <Box flex={5} justifyContent="center">
      {contentArray[content]}
    </Box>
  );
};

export default Content;
