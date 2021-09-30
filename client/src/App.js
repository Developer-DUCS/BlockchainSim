import React from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Error from "./components/Error";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

// Imports for the theme
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Demo from "./components/Demo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const lightTheme1 = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#388697", light: "#3d93a5", dark: "#337989" },
    secondary: { main: "#DE6B48", light: "#e17859", dark: "#db5e37" },
    error: { main: "#BC2C1A", light: "#cd301c", dark: "#ab2818" },
    warning: { main: "#5D2E8C", light: "#67339b", dark: "#53297d" },
    info: { main: "#9D8420", light: "#ad9223", dark: "#8d761d" },
    success: { main: "#127E59", light: "#148f65", dark: "#106d4d" },
    background: { paper: "#fffcf7", default: "#f7faff" },
    text: {
      primary: "#011627",
      secondary: "#011627",
      disabled: "#011627",
    },
  },
});

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.palette.mode === "light" ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={lightTheme1}>
      <CssBaseline />
      <Router>
        <NavBar toggleTheme={toggleTheme} />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/create" component={SignUp} />
          <Route path="/demo" component={Demo} />
          <Route component={Error} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
