import React from "react";
import HomePage from "./components/HomePage";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import EansPage from "./components/EansPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import BlockHeader from "./components/BlockHeader";
import MiningPool from "./components/MiningPool";
import NavBar from "./components/NavBar";
import UserBar from "./components/UserBar";
import SignUp from "./components/SignUp";
import Demo from "./components/Demo";

// Imports for the theme
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./js/themes/lightTheme";

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  const [signIn, setSignIn] = React.useState(false);

  // Check if the user is signed in
  React.useEffect(() => {
    fetch("http://localhost:5000/api/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: window.localStorage.getItem("token") }),
    }).then((res) => {
      if (res.status == 200) {
        console.log("Authorized");
        setSignIn(true);
      } else {
        console.error("Unauthorized");
        setSignIn(false);
      }
    });
  }, []);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Switch>
          <Route path="/ean" component={EansPage} />
          <Route path="/" component={HomePage} exact />
          <Route
            path="/signin"
            render={() => <SignIn toggleSignIn={toggleSignIn} />}
          />
          <Route path="/landing" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/demo" render={() => <Demo setTheme={setTheme} />} />

          <Route component={Error} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
