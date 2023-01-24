import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./PageNotFound";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "antd/dist/reset.css";
import { ConfigProvider, theme } from "antd";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: darkMode === true ? "dark" : "light",
        },
      })}
    >
      <CssBaseline />
      <ConfigProvider
        theme={{
          algorithm:
            darkMode === true ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <div>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route
                exact
                path="/dashboard"
                element={
                  <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
                }
              />
              <Route exact path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
