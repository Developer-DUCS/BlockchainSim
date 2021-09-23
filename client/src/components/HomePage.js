import { Container, Typography } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h3" align="center">
        Homepage
      </Typography>
      <Typography variant="h4">About</Typography>
      <Typography variant="body1">Blockchain Simulation</Typography>
    </Container>
  );
};

export default HomePage;
