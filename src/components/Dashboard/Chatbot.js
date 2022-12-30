import React, { useState } from "react";
import { Typography } from "@mui/material";
import url from "../../ServerUrl";
import Input from "@mui/material/Input";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import SnackbarForChatbot from "../ReusableComponents/SnackbarForChatbot";
import Snackbar from "../ReusableComponents/Snackbar";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import CodeEditor from "@uiw/react-textarea-code-editor";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [severity, setSeverity] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSnackbarChatbot, setIsOpenSnackbarChatbot] = useState(false);

  const body = { prompt: message };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (message.length > 0) {
      event.preventDefault();
      setIsOpenSnackbarChatbot(true);

      try {
        const response = await fetch(`${url}/chatbot/getResponseFromChatbot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(body),
        });
        const json = await response.json();
        if (response.status === 200) {
          setChatbotResponse(json.message);
          setIsOpenSnackbarChatbot(false);
        } else {
          setIsOpen(true);
          setMessageSnackbar("Something went wrong...Try again later!");
          setSeverity("error");
        }
      } catch (error) {
        setIsOpen(true);
        setMessageSnackbar("Something went wrong...Try again later!");
        setSeverity("error");
      }
    } else {
      setIsOpen(true);
      setMessageSnackbar("Please enter some text!");
      setSeverity("warning");
    }
  };
  return (
    <div className="mt-4 mx-4">
      <Snackbar
        isOpen={isOpen}
        severity={severity}
        message={messageSnackbar}
        setIsOpen={setIsOpen}
      />
      <SnackbarForChatbot
        isOpen={isOpenSnackbarChatbot}
        severity="info"
        message="Fetching results..."
        setIsOpen={setIsOpenSnackbarChatbot}
      />
      <Typography px={2} variant="h4" component="div" gutterBottom>
        My AI Assistant
      </Typography>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        style={{ height: "50vh", width: "60vw" }}
        className="mx-4 mt-4"
      >
        <Input
          id="input-with-icon-adornment"
          placeholder="Hi Sir! How can I help you?"
          sx={{ width: "100%" }}
          endAdornment={
            <InputAdornment position="end" style={{ cursor: "pointer" }}>
              <SendIcon onClick={handleSubmit} />
            </InputAdornment>
          }
          value={message}
          onChange={handleChange}
          required
        />
        {chatbotResponse && (
          <div className="mt-4 ">
            <div className="d-flex flex-row-reverse">
              <b
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(chatbotResponse);
                  setIsOpen(true);
                  setMessageSnackbar("Copied to clipboard!");
                  setSeverity("success");
                }}
              >
                Copy&nbsp;
              </b>
              <ContentPasteOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(chatbotResponse);
                  setIsOpen(true);
                  setMessageSnackbar("Copied to clipboard!");
                  setSeverity("success");
                }}
              />
            </div>
            <CodeEditor
              value={chatbotResponse}
              language="java"
              className="form-control"
              padding={15}
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "monospace",
                borderRadius: "4px",
                fontSize: "20px",
                height: "60vh",
                overflowY: "scroll",
              }}
              readOnly
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Chatbot;
