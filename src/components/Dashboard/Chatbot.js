import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import url from "../../ServerUrl";
import Input from "@mui/material/Input";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import Spinner from "../ReusableComponents/Spinner";

const Chatbot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const body = { prompt: message };
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${url}/chatbot/getResponseFromChatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    setIsLoading(false);
    setChatbotResponse(json.message);
  };
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4 mx-4">
          <Typography px={2} variant="h4" component="div" gutterBottom>
            My AI Assistant
          </Typography>
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{ height: "50vh", width: "50vw" }}
            className="mx-4 mt-4"
          >
            <Input
              id="input-with-icon-adornment"
              placeholder="Hi Priyanshu, How can I help you?"
              sx={{ width: "100%" }}
              endAdornment={
                <InputAdornment position="end">
                  <SendIcon />
                </InputAdornment>
              }
              value={message}
              onChange={handleChange}
            />
            {chatbotResponse && (
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                className="mt-4"
              >
                Ans: {chatbotResponse}
              </Typography>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
