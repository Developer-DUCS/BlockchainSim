import React from "react";
import HomePage from "./components/HomePage";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/reusable/NavBar";
import SignUp from "./components/SignUp";
import Simulation from "./components/Simulation";
import TutorialHome from "./components/TutorialHome";

// Imports for the theme
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./themes/lightTheme";
import CreateSimulation from "./components/CreateSimulationPage";
import SimulationHome from "./components/SimulationHome";
import Feedback from "./components/reusable/Feedback";

import { CookiesProvider, useCookies } from "react-cookie";

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  const [signIn, setSignIn] = React.useState(false);
  const basename = process.env.REACT_APP_BASENAME || null;
  const [feedback, setFeedback] = React.useState(false);
  const [feedbackObj, setFeedbackObj] = React.useState({
    message: "",
    severity: "success",
  });
  const [cookies, setCookie] = useCookies(["token"]);

  // Check if the user is signed in
  React.useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_URL}/api/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: cookies.token }),
    }).then((res) => {
      if (res.status == 200) {
        setSignIn(true);
      } else {
        setSignIn(false);
      }
    });
  }, []);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={basename}>
          <Switch>
            {/* Route to "/" */}
            <Route
              path={`${process.env.PUBLIC_URL}/`}
              render={() => (
                <>
                  <HomePage />
                </>
              )}
              exact
            />

            {/* Route to "/signin" */}
            <Route
              path={`${process.env.PUBLIC_URL}/signin`}
              render={() => (
                <>
                  <NavBar
                    setTheme={setTheme}
                    signIn={signIn}
                    toggleSignIn={toggleSignIn}
                  />
                  <SignIn
                    toggleSignIn={toggleSignIn}
                    setFeedback={setFeedback}
                    setFeedbackObj={setFeedbackObj}
                  />
                </>
              )}
            />

            {/* Route to "/signup" */}
            <Route
              path={`${process.env.PUBLIC_URL}/signup`}
              render={() => (
                <>
                  <NavBar
                    setTheme={setTheme}
                    signIn={signIn}
                    toggleSignIn={toggleSignIn}
                  />
                  <SignUp
                    setFeedback={setFeedback}
                    setFeedbackObj={setFeedbackObj}
                  />
                </>
              )}
            />

            {/* Route to "/landing" */}
            <Route
              path={`${process.env.PUBLIC_URL}/landing`}
              component={LandingPage}
            />

            {/* Route to "/createsimulation" */}
            <Route
              path={`${process.env.PUBLIC_URL}/createsimulation`}
              render={() => (
                <CreateSimulation
                  setTheme={setTheme}
                  setFeedback={setFeedback}
                  setFeedbackObj={setFeedbackObj}
                />
              )}
            />

            {/* Route to "/simulation" */}
            <Route
              path={`${process.env.PUBLIC_URL}/simulation`}
              render={() => <SimulationHome setTheme={setTheme} />}
              exact
            />

            {/* Route to "/simulation/:id" */}
            <Route
              path={`${process.env.PUBLIC_URL}/simulation/:id`}
              render={() => (
                <Simulation
                  setTheme={setTheme}
                  setFeedback={setFeedback}
                  setFeedbackObj={setFeedbackObj}
                />
              )}
            />
            {/*Route to "/tutorialHome"*/}
            <Route
              path={`${process.env.PUBLIC_URL}/tutorialHome`}
              render={() => (
                <TutorialHome
                  setTheme={setTheme}
                  setFeedback={setFeedback}
                  setFeedbackObj={setFeedbackObj}
                />
              )}
            />
            {/* Route to ERROR pages */}
            <Route component={Error} />
          </Switch>
        </Router>

        {/* Feedback Modal */}
        <Feedback
          feedbackObj={feedbackObj}
          open={feedback}
          setOpen={setFeedback}
        />
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default App;
