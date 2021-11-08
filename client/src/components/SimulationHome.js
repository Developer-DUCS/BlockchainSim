import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import BlockComponent from "./BlockComponent";
import UserBar from "./UserBar";
import SimTable from "./SimTable";
import TabPanel from "./TabPanel";

const SimulationHome = (props) => {
  const { setTheme } = props;
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [user, setUser] = React.useState({});

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

  const tablerows2 = {
    rows: [
      {
        name: "Testing",
        edited: "10/28/2021",
        created: "10/28/2021",
        blocks: 2,
        id: 1,
      },
      {
        name: "Ean's Super AMazing Simulation",
        edited: "10/28/2021",
        created: "10/28/2021",
        blocks: 102,
        id: 2,
      },
      {
        name: "BtB's Simulation",
        edited: "10/28/2021",
        created: "10/28/2021",
        blocks: 1633,
        id: 3,
      },
    ],
  };

  return (
    <Auth setUser={setUser}>
      <UserBar
        barTitle={"Simulations"}
        tabNames={["My Simulations", "Shared With Me"]}
        setSelectedTab={(e, newValue) => setSelectedTab(newValue)}
        selectedTab={selectedTab}
        setTheme={setTheme}
      />
      <Container>
        <TabPanel value={selectedTab} index={0}>
          <div>
            User testing
            <h4>userEmail: {user.email}</h4>
          </div>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <SimTable table={tablerows} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <SimTable table={tablerows2} />
            </Grid>
          </Grid>
        </TabPanel>
        <Button
          component={Link}
          to={"/createsimulation"}
          color="secondary"
          variant="contained"
          sx={{ float: 500, mr: 2 }}
        >
          Add New Simulation
        </Button>
      </Container>
    </Auth>
  );
};
export default SimulationHome;
