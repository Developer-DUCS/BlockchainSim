import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import React from "react";
require("dotenv").config({ path: "../../../.env" });

const SignUp = () => {
  const [password, setPassword] = React.useState(false);
  const [verifyPassword, setVerifyPassword] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create account
    // if successful, redirect to login page
    const url = `http://localhost:3220/api/users/register`;
    const payload = {
      id: email,
      pass: password,
      role: "dev",
    };
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status == 201) {
        //redirect
        history.push("/signin");
      }
      if (res.status == 409) {
        // username already exist
        // display invalid username
        setEmailError(true);
      }
    });
  };

  // If password or verify password change
  React.useEffect(() => {
    checkPassword();
  }, [password, verifyPassword]);

  // Check if passwords match
  const checkPassword = () => {
    if (password !== verifyPassword) {
      setError(true);
    } else {
      setError(false);
    }
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
          Sign Up
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
                    onChange={(e) => {
                      verifyEmail(e.target.value);
                      setEmail(e.target.value);
                    }}
                    helperText={
                      emailError
                        ? "Not a valid email address"
                        : "We'll never share your email with anyone else."
                    }
                    error={emailError}
                    color={emailError ? "error" : "success"}
                    focused={email.length > 0}
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    error={error}
                    helperText={error ? "Passwords do not match" : ""}
                    focused={password.length > 0}
                    color={error ? "error" : "success"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Verify Password"
                    name="verifyPassword"
                    size="small"
                    type="password"
                    variant="outlined"
                    required
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    error={error}
                    helperText={error ? "Passwords do not match" : ""}
                    focused={verifyPassword.length > 0}
                    color={error ? "error" : "success"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  error || emailError || !password || !verifyPassword || !email
                }
                fullWidth
                type="submit"
                variant="contained"
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
