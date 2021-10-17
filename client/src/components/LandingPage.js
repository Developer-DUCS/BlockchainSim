import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

const LandingPage = () => {
  return (
    <Auth>
      <Container>
        <Typography variant="h3" align="center">
          LandingPage
        </Typography>
        <Typography variant="h4">Blockchain Data</Typography>
        <Typography variant="body1">Blockchain Simulation</Typography>
        <Link to="/logout">Logout</Link>
      </Container>
    </Auth>
  );
};
export default LandingPage;
