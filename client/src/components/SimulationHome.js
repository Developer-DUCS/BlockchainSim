import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./reusable/Auth";
import UserBar from "./reusable/UserBar";
import SimTable from "./reusable/SimTable";
import TabPanel from "./reusable/TabPanel";
import LinearProgress from "@mui/material/LinearProgress";
import Parallax from "./HomePageComponents/Parallax";

const SimulationHome = (props) => {
  const { setTheme } = props;
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [simulations, setSimulations] = React.useState([]);
  const [sharedSimulations, setSharedSimulations] = React.useState([]);

  const [user, setUser] = React.useState({});

  // On page load
  React.useEffect(() => {
    // If user is logged in, fetch simulation data
    if (user.email) {
      // Fetch api "/getsimulations" via POST
      let url = `${process.env.REACT_APP_URL_SCHEME}://${process.env.REACT_APP_API_URL}/api/data/getsimulations`;
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

      // Fetch api "/getsharedsimulations" via GET
      url = `${process.env.REACT_APP_URL_SCHEME}://${process.env.REACT_APP_API_URL}/api/data/getsharedsimulations`;
      fetch(url, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.error("failed to fetch");
          }
        })
        .then((simulations) => {
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
          to={`${process.env.PUBLIC_URL}/createsimulation`}
          color="secondary"
          variant="contained"
          sx={{ float: 500, ml: 2, mt: 2 }}
        >
          Create New Simulation
        </Button>
        <TabPanel value={selectedTab} index={0}>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              {simulations.rows ? (
                <SimTable table={simulations} />
              ) : (
                <>
                  <LinearProgress />
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
                  <LinearProgress />
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
