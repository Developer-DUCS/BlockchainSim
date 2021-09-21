import React, { Component } from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Error from "./components/Error";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Imports for the theme
import CssBaseline from "@mui/material/CssBaseline";
import ThemeSwitch from "@mui/material/Switch";

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

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.palette.mode === "light" ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeSwitch onChange={toggleTheme} />
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
