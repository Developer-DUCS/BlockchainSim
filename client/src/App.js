import React from "react";
import HomePage from "./components/HomePage";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/reusable/NavBar";
import SignUp from "./components/SignUp";
import Demo from "./components/Demo";
import Simulation from "./components/Simulation";

// Imports for the theme
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./js/themes/lightTheme";
import CreateSimulation from "./components/CreateSimulationPage";
import SimulationHome from "./components/SimulationHome";

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  const [signIn, setSignIn] = React.useState(false);
  const basename = process.env.REACT_APP_BASENAME || null;

  // Check if the user is signed in
  React.useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_URL}/api/users/auth`, {
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

      <Router basename={basename}>
        <Switch>
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            render={() => (
              <>
                <HomePage />
              </>
            )}
            exact
          />
          <Route
            path={`${process.env.PUBLIC_URL}/signin`}
            render={() => (
              <>
                <NavBar
                  setTheme={setTheme}
                  signIn={signIn}
                  toggleSignIn={toggleSignIn}
                />
                <SignIn toggleSignIn={toggleSignIn} />
              </>
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/landing`}
            component={LandingPage}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/createsimulation`}
            component={CreateSimulation}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/signup`}
            render={() => (
              <>
                <NavBar
                  setTheme={setTheme}
                  signIn={signIn}
                  toggleSignIn={toggleSignIn}
                />
                <SignUp />
              </>
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/demo`}
            render={() => <Demo setTheme={setTheme} />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/simulation`}
            render={() => <SimulationHome setTheme={setTheme} />}
            exact
          />
          <Route
            path={`${process.env.PUBLIC_URL}/simulation/:id`}
            render={() => <Simulation setTheme={setTheme} />}
          />

          <Route component={Error} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
