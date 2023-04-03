import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import Snackbar from "../../ReusableComponents/Snackbar";
import SnackbarForCompiling from "../../ReusableComponents/SnackbarForShowingWait";
import CodeMirror from "@uiw/react-codemirror";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { tags as t } from "@lezer/highlight";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";

const Compiler = () => {
  const [language, setLanguage] = useState("Java");

  const languageArray = ["Java", "Python", "C++", "C", "Javascript"];
  const languageArrayExtension = {
    Java: 4,
    Python: 5,
    C: 6,
    "C++": 7,
    Javascript: 17,
  };
  const extensionsEditor = {
    Java: java(),
    Python: python(),
    "C++": cpp(),
    C: cpp(),
    Javascript: javascript(),
  };
  const [languageDefaultCode, setLanguageDefaultCode] = useState({
    Java: `//'main' method must be in a class 'Progman'.
    class Progman {
        public static void main(String[] args) {
            System.out.println("Hello, world!");
        }
    }`,
    Python: `print("Hello, world!")`,
    "C++": `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, world!";
    return 0;
    }`,
    C: `#include <stdio.h>
    int main() {
        printf("Hello, world!");
        return 0;
        }`,
    Javascript: `console.log("Hello, world!");`,
  });
  const [code, setCode] = useState(languageDefaultCode[language]);
  const [consoleInputs, setConsoleInputs] = useState({
    Java: " ",
    Python: " ",
    "C++": " ",
    C: " ",
    Javascript: " ",
  });
  const [outputBoxValue, setOutputBoxValue] = useState({
    Java: "Your output will appear here... ",
    Python: "Your output will appear here... ",
    "C++": "Your output will appear here... ",
    C: "Your output will appear here... ",
    Javascript: "Your output will appear here... ",
  });
  const [compilingSnackbar, setCompilingSnackbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const executeCode = () => {
    setOutputBoxValue(" ");
    setCompilingSnackbar(true);
    var data = qs.stringify({
      Program: code,
      LanguageChoice: languageArrayExtension[language],
      Input: consoleInputs[language],
    });
    var config = {
      method: "POST",
      url: "https://code-compiler.p.rapidapi.com/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": `${process.env.REACT_APP_COMPILER_API_KEY}`,
        "X-RapidAPI-Host": "code-compiler.p.rapidapi.com",
      },

      data: data,
    };
    axios(config)
      .then(function (response) {
        const output = response?.data?.Result;
        const error = response?.data?.Errors;
        setOutputBoxValue({
          ...outputBoxValue,
          [language]: output ? output : error,
        });
        setCompilingSnackbar(false);
      })
      .catch(function (error) {
        setCompilingSnackbar(false);
        if (error.response.status === 408) {
          setSeverity("error");
          setMessageSnackbar("Please provide valid console inputs");
          setIsOpen(true);
        } else {
          setSeverity("error");
          setMessageSnackbar("Something went wrong");
          setIsOpen(true);
        }
      });
  };

  return (
    <div>
      <Snackbar
        isOpen={isOpen}
        severity={severity}
        message={messageSnackbar}
        setIsOpen={setIsOpen}
      />
      <SnackbarForCompiling
        isOpen={compilingSnackbar}
        severity="info"
        message="Compiling..."
        setIsOpen={setCompilingSnackbar}
      />
      <Box>
        <FormControl>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "70vw",
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Choose language
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Choose language"
              onChange={(event) => {
                setLanguage(event.target.value);
                setCode(languageDefaultCode[event.target.value]);
              }}
              style={{ flexBasis: "80%" }}
            >
              {languageArray.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              onClick={executeCode}
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              style={{ flexBasis: "8rem", height: "3rem" }}
            >
              Run code
            </Button>
          </div>
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "0.5rem",
          }}
        >
          <CodeMirror
            value={languageDefaultCode[language]}
            height="65vh"
            width="50vw"
            extensions={[extensionsEditor[language]]}
            onChange={(value) => {
              setCode(value);
              setLanguageDefaultCode({
                ...languageDefaultCode,
                [language]: value,
              });
            }}
            theme={draculaInit({
              settings: {
                caret: "#c6c6c6",
                fontFamily: "monospace",
              },
              styles: [{ tag: t.comment, color: "#6272a4" }],
            })}
            style={{
              marginTop: "2rem",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "20%",
              marginBlock: "2rem",
              gap: "0.5rem",
            }}
          >
            <label style={{ fontSize: "1.2rem" }}>Console inputs:</label>
            <textarea
              rows="3"
              cols="30"
              value={consoleInputs[language]}
              onChange={(e) => {
                setConsoleInputs({
                  ...consoleInputs,
                  [language]: e.target.value,
                });
              }}
              style={{
                backgroundColor: "#1e1e1e",
                color: "white",
                padding: "1rem",
                overflow: "auto",
                borderRadius: "5px",
              }}
            />
            <label style={{ fontSize: "1.2rem" }}>Output:</label>
            <textarea
              label="Output"
              rows="7"
              cols="30"
              value={outputBoxValue[language]}
              readOnly
              style={{
                caretColor: "transparent",
                backgroundColor: "#1e1e1e",
                color: "white",
                padding: "1rem",
                overflow: "auto",
                borderRadius: "5px",
              }}
            ></textarea>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Compiler;
