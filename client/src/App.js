import React from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Error from "./components/Error";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import BlockHeader from "./components/BlockHeader";

// Imports for the theme
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Demo from "./components/Demo";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const lightTheme = createTheme({
  palette: {
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

const eanTheme1 = createTheme({
  palette: {
    primary: { main: "#5680E9", light: "#3d93a5", dark: "#337989" },
    secondary: { main: "#5AB9EA", light: "#e17859", dark: "#db5e37" },
    error: { main: "#BC2C1A", light: "#cd301c", dark: "#ab2818" },
    warning: { main: "#E8846D", light: "#67339b", dark: "#53297d" },
    info: { main: "#C1C8E4", light: "#ad9223", dark: "#8d761d" },
    success: { main: "#A6E83F", light: "#148f65", dark: "#106d4d" },
    background: { paper: "#fff", default: "#fff" },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#000",
    },
  },
});

const App = () => {
  const [toggle, setToggle] = React.useState(false);
  const [theme, setTheme] = React.useState(lightTheme);

  const changeTheme = (theme) => {
    alert("test");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar toggleTheme={changeTheme} />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/create" component={SignUp} />
          <Route path="/demo" render={() => <Demo setTheme={setTheme} />} />
          <Route component={Error} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
