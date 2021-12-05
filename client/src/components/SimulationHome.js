import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./reusable/Auth";
import UserBar from "./reusable/UserBar";
import SimTable from "./reusable/SimTable";
import TabPanel from "./reusable/TabPanel";

const SimulationHome = (props) => {
  const { setTheme } = props;
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [simulations, setSimulations] = React.useState([]);
  const [sharedSimulations, setSharedSimulations] = React.useState([]);

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
          setSimulations({ rows: simulations });
        })
        .catch((err) => {
          console.error(err);
        });

      // Shared Simulations
      url = "http://localhost:5000/api/data/getsharedsimulations";

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
          setSharedSimulations({ rows: simulations });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

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
                <>
                  <p>0 Simulations</p>
                  <p>Create a new simulation</p>
                </>
              )}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              {sharedSimulations.rows ? (
                <SimTable table={sharedSimulations} />
              ) : (
                <>
                  <p>0 Shared Simulations</p>
                </>
              )}{" "}
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Auth>
  );
};
export default SimulationHome;
