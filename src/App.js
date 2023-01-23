import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./PageNotFound";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



function App() {
    const [darkMode, setDarkMode] = React.useState(true);
    const darkTheme = createTheme({
        palette: {
          mode: darkMode===true?'dark':'light',
        },
      });
  return (
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode}/>} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
