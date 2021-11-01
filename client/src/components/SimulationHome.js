import { Container, Typography, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import BlockComponent from "./BlockComponent";
import UserBar from "./UserBar";
import SimTable from "./SimTable";

const SimulationHome = () => {
  const tablerows = {
    rows: [
      {
        name: "Test Simulation",
        edited: "10/28/2021",
        created: "10/28/2021",
        blocks: 20,
        id: 1,
      },
      {
        name: "Ean's Super Awesome Simulation",
        edited: "10/28/2021",
        created: "10/28/2021",
        blocks: 10,
        id: 2,
      },
      {
        name: "BtB's Simulation",
        edited: "10/28/2021",
        created: "10/28/2021",
        blocks: 200000,
        id: 3,
      },
    ],
  };
  return (
    <Auth>
      <UserBar
        barTitle={"Simulations"}
        tabNames={["My Simulations", "Shared With Me"]}
      />
      <Container>
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <SimTable table={tablerows} />
          </Grid>
        </Grid>
      </Container>
    </Auth>
  );
};
export default SimulationHome;
