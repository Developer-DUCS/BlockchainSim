import { Container, Typography, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import BlockComponent from "./BlockComponent";
import UserBar from "./UserBar";
import SimTable from "./SimTable";

const LandingPage = () => {
  return (
    <Auth>
      <Container>
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid item xs={60}>
            <SimTable />
          </Grid>
        </Grid>
      </Container>
    </Auth>
  );
};
export default LandingPage;
