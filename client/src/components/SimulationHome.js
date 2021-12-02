import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./reusable/Auth";
import BlockComponent from "./reusable/BlockComponent";
import UserBar from "./reusable/UserBar";
import SimTable from "./reusable/SimTable";
import TabPanel from "./reusable/TabPanel";

const SimulationHome = (props) => {
  const { setTheme } = props;
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [simulations, setSimulations] = React.useState([]);

  const [user, setUser] = React.useState({});

  // On page load - load simulations
  // Fetch api "/getsimulations" via POST
  React.useEffect(() => {
    if (user.email) {
      let url = "http://localhost:5000/api/data/getsimulations";
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      };

      fetch(url, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.error("failed to fetch");
          }
        })
        .then((simulations) => {
          console.log(simulations);
          setSimulations({ rows: simulations });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

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
        <Button
          component={Link}
          to={"/createsimulation"}
          color="secondary"
          variant="contained"
          sx={{ float: 500, ml: 2, mt: 2 }}
        >
          Add New Simulation
        </Button>
        <TabPanel value={selectedTab} index={0}>
          {/* <div>
            User testing
            <h4>userEmail: {user.email}</h4>
          </div> */}
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              {simulations.rows ? (
                <SimTable table={simulations} />
              ) : (
                <p>Row data is 0</p>
              )}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              {/* <SimTable table={tablerows2} /> */}
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Auth>
  );
};
export default SimulationHome;
