import React from "react";
import {
  Button,
  Grid,
  TextField,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const SignIn = (props) => {
  const { toggleSignIn, setFeedbackObj, setFeedback } = props;
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const history = useHistory();

  // Checks to see if the user is already logged in and
  // redirects them to the home page if they are
  React.useEffect(() => {
    fetch("http://localhost:5000/api/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: window.localStorage.getItem("token") }),
    })
      .then((res) => {
        if (res.status == 200) {
          // Process the httpservletresponse
          return res.json();
        } else {
          console.error("Unauthorized");
        }
      })
      .then((user) => {
        if (user) {
          // Feedback
          setFeedback(true);
          setFeedbackObj({
            message: "Signed in!",
            severity: "success",
          });

          history.push("/simulation");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = { email, password };

    // API call to login to account
    // if successful, redirect to landing page
    // if not, display error message
    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          throw new Error("Failed to Login!");
        }
      })
      .then(async (res) => {
        // Store token in cookie
        window.localStorage.setItem("token", res.token);

        // Toggle state of sign in
        toggleSignIn();

        // Feedback
        setFeedback(true);
        setFeedbackObj({ message: "Signed in!", severity: "success" });

        //redirect
        history.push("/simulation");
      })
      .catch(async (err) => {
        // Feedback
        setFeedback(true);
        setFeedbackObj({ message: "Sign In Error", severity: "error" });

        console.error(err);
      });
  };

  // Check if email is valid
  const verifyEmail = (email) => {
    if (email.length > 0) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setEmailError(!re.test(String(email).toLowerCase()));
    } else setEmailError(false);
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 2 }} elevation={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    size="small"
                    variant="outlined"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      verifyEmail(e.target.value);
                      setEmail(e.target.value);
                    }}
                    helperText={emailError ? "Not a valid email address" : ""}
                    color={emailError ? "error" : "success"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    size="small"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
