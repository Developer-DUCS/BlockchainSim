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

var passwordValidator = require("password-validator");

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(16) // Maximum length 16
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces(); // Should not have spaces

const SignUp = (props) => {
  const { setFeedback, setFeedbackObj } = props;
  const [password, setPassword] = React.useState(false);
  const [verifyPassword, setVerifyPassword] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [passwordMatchError, setPasswordMatchError] = React.useState(false);
  const [passwordValidateError, setPasswordValidateError] =
    React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create account
    // if successful, redirect to login page

    // Fetch api "/register" via POST
    // Config for post request
    const url = `http://${process.env.REACT_APP_API_URL}/api/users/register`;
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
        // Feedback
        setFeedback(true);
        setFeedbackObj({ message: "Account Created!", severity: "success" });

        //redirect
        history.push(`${process.env.PUBLIC_URL}/signin`);
      }
      if (res.status == 409) {
        // Feedback
        setFeedback(true);
        setFeedbackObj({
          message: "Email already in use.",
          severity: "error",
        });

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
    if (password !== verifyPassword && password != "") {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }

    if (!schema.validate(password) && password != "") {
      setPasswordValidateError(true);
    } else {
      setPasswordValidateError(false);
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
                    error={passwordValidateError}
                    helperText={
                      passwordValidateError ? (
                        <div>
                          <p style={{ margin: 0 }}>
                            Password does not meet requirements
                          </p>
                          <p style={{ margin: 0 }}>
                            6-16 characters, 1 uppercase, 1 lowercase, 1 number
                          </p>
                        </div>
                      ) : (
                        "6-16 characters, 1 uppercase, 1 lowercase, 1 number"
                      )
                    }
                    focused={password.length > 0}
                    color={passwordValidateError ? "error" : "success"}
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
                    error={passwordMatchError}
                    helperText={
                      passwordMatchError ? "Passwords do not match" : ""
                    }
                    focused={verifyPassword.length > 0}
                    color={passwordMatchError ? "error" : "success"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  passwordMatchError ||
                  emailError ||
                  !password ||
                  !verifyPassword ||
                  !email
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
