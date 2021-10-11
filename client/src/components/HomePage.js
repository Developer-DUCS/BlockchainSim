import { Container, Typography, Divider, Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center">
        Homepage
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6} textAlign="center">
          <Button
            component={Link}
            to={"/demo"}
            color="primary"
            variant="contained"
          >
            Demo Page
          </Button>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Button
            component={Link}
            to={"/landing"}
            color="primary"
            variant="contained"
          >
            Landing Page
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ m: 3 }} />
      <Typography variant="h4">About</Typography>
      <Typography variant="body1">
        Beyond the Block consists of a web page that simulates how blockchain
        works. It allows a user to explore the process of block chain. At the
        same time, the simulator can be extended to different block chain
        technologies. The user can interact with the simulator, changing
        variables to further understand how blockchain works and how
        transactions are made.
      </Typography>
    </Container>
  );
};

export default HomePage;
