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
    Java: "java",
    Python: "py",
    "C++": "cpp",
    C: "c",
    Javascript: "js",
  };
  const extensionsEditor = {
    Java: java(),
    Python: python(),
    "C++": cpp(),
    C: cpp(),
    Javascript: javascript(),
  };
  const languageDefaultCode = {
    Java: `public class HelloWorld {
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
  };
  const [code, setCode] = useState(languageDefaultCode[language]);
  const [consoleInputs, setConsoleInputs] = useState(" ");
  const [outputBoxValue, setOutputBoxValue] = useState(
    "Your output will appear here... "
  );
  const [compilingSnackbar, setCompilingSnackbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const executeCode = () => {
    setOutputBoxValue(" ");
    setCompilingSnackbar(true);
    var data = qs.stringify({
      code: code,
      language: languageArrayExtension[language],
      input: consoleInputs,
    });
    var config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const output = response?.data?.output;
        const error = response?.data?.error;
        setOutputBoxValue(output ? output : error);
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

  function handleEditorChange(value) {
    setCode(value);
  }

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
        <CodeMirror
          value={languageDefaultCode[language]}
          height="300px"
          width="90%"
          extensions={[extensionsEditor[language]]}
          theme={draculaInit({
            settings: {
              caret: "#c6c6c6",
              fontFamily: "monospace",
            },
            styles: [{ tag: t.comment, color: "#6272a4" }],
          })}
          onChange={handleEditorChange}
          style={{
            marginBlock: "2rem",
          }}
        />
        <label for="textarea">Console inputs:</label>
        <br />
        <textarea
          rows={3}
          cols="95"
          value={consoleInputs}
          onChange={(e) => setConsoleInputs(e.target.value)}
          style={{
            backgroundColor: "#1e1e1e",
            color: "white",
            padding: "1rem",
            overflow: "auto",
            borderRadius: "5px",
            marginBlock: "10px",
          }}
        />
        <br />
        <label for="textarea">Output:</label>
        <br />
        <textarea
          label="Output"
          rows="5"
          cols="95"
          value={outputBoxValue}
          readonly
          style={{
            caretColor: "transparent",
            backgroundColor: "#1e1e1e",
            color: "white",
            padding: "1rem",
            overflow: "auto",
            borderRadius: "5px",
            marginBlock: "10px",
          }}
        ></textarea>
      </Box>
    </div>
  );
};

export default Compiler;
