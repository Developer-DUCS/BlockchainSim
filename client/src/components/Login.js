import React from "react";
import {
  Button,
  Grid,
  TextField,
  Container,
  Paper,
  Typography,
} from "@mui/material";

const Login = () => {
  const [password, setPassword] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const credentials = { email, password };

    // API call to login to account
    // if successful, redirect to landing page
    // if not, display error message
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
          Login
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
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
