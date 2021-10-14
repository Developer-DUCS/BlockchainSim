import React from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Error from "./components/Error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import BlockHeader from "./components/BlockHeader";
import MiningPool from "./components/MiningPool";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Demo from "./components/Demo";

// Imports for the theme
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./js/themes/lightTheme";

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar setTheme={setTheme} />
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
