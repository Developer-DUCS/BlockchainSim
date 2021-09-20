import React from "react";
import { Button, Grid, TextField, Container } from "@mui/material";


const Login = () => {

  return (
    <Container maxWidth="xs">
      <form>
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
                />  
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button 
            color="primary" 
            fullWidth
            type="submit"
            variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
