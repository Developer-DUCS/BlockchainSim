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

const testTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#388697", light: "#fff", dark: "#1E2019" },
    secondary: { main: "#90A583", light: "#fff", dark: "#1E2019" },
    error: { main: "#BC2C1A", light: "#fff", dark: "#1E2019" },
    warning: { main: "#942911", light: "#fff", dark: "#1E2019" },
    info: { main: "#9D8420", light: "#fff", dark: "#1E2019" },
    success: { main: "#8DAB7F", light: "#98b38b", dark: "#1E2019" },
    background: { paper: "#FFFCF7", default: "#FFFCF7" },
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
    <ThemeProvider theme={theme}>
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
