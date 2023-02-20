import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CodeEditor from "@uiw/react-textarea-code-editor";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Snackbar from "../../ReusableComponents/Snackbar";
import SnackbarForCompiling from "../../ReusableComponents/SnackbarForShowingWait";

const Compiler = () => {
  const [language, setLanguage] = useState("Java");

  const languageArray = [
    "Java",
    "Python",
    "C++",
    "C",
    "GoLang",
    "C#",
    "Javascript",
  ];
  const languageArrayExtension = {
    Java: "java",
    Python: "py",
    "C++": "cpp",
    C: "c",
    GoLang: "go",
    "C#": "cs",
    Javascript: "js",
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
    GoLang: `package main
    import "fmt"
    func main() {
        fmt.Println("Hello, world!")
        }
        `,
    "C#": `using System;
    namespace HelloWorld
    {
        class Hello {
            static void Main() {
                Console.WriteLine("Hello, world!");
                }
            }
        }
                `,
    Javascript: `console.log("Hello, world!");`,
  };
  const [code, setCode] = useState(languageDefaultCode[language]);
  const [consoleInputs, setConsoleInputs] = useState(" ");
  const [outputBoxValue, setOutputBoxValue] = useState(" ");
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
        console.table(response.data);
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
              style={{ flexBasis: "15%" }}
            >
              Run code
            </Button>
          </div>
        </FormControl>
        <div data-color-mode="dark">
          <CodeEditor
            value={languageDefaultCode[language]}
            language={languageArrayExtension[language]}
            onChange={(event) => setCode(event.target.value)}
            style={{
              fontSize: 20,
              height: "50vh",
              width: "90%",
              overflowY: "scroll",
              marginBlock: "5vh",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
        <TextField
          label="Console inputs"
          multiline
          rows={3}
          value={consoleInputs}
          onChange={(e) => setConsoleInputs(e.target.value)}
          style={{ marginBlock: "1rem", width: "90%" }}
        />
        <br />
        <TextField
          label="Output"
          multiline
          rows={5}
          InputProps={{
            readOnly: true,
          }}
          value={outputBoxValue}
          style={{ marginBlock: "1rem", width: "90%" }}
        />
      </Box>
    </div>
  );
};

export default Compiler;
