import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Card,
  CardContent,
  Grid,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import BlockComponent from "./reusable/BlockComponent";
import UserBar from "./reusable/UserBar";
import Auth from "./reusable/Auth";
import { useParams } from "react-router-dom";
import TabPanel from "./reusable/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";

const Simulation = (props) => {
  const history = useHistory();
  const { setTheme, setFeedback, setFeedbackObj } = props;
  const [user, setUser] = React.useState({});
  const { id } = useParams();

  // Used for UserBar component to keep track of selected tab - Set Default to default tab index
  const [selectedTab, setSelectedTab] = React.useState(0);

  // Used to click transactions
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  // Used to hold simulation blocks
  const [simulationBlocks, setSimulationBlocks] = React.useState([]);

  // Used for options menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Used for dialog
  const [dialog, setDialog] = React.useState(false);
  const toggleDialog = () => {
    dialog ? setDialog(false) : setDialog(true);
  };

  // Options for date format
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const [simulation, setSimulation] = React.useState({
    email: "",
    sim_block: "",
    sim_created: "2009-02-10T01:44:31.000Z",
    sim_description: "",
    sim_id: 0,
    sim_modified: "2009-02-10T01:44:31.000Z",
    sim_name: "",
    sim_shared: "",
  });

  React.useEffect(() => {
    if (user.email) {
      let url = `http://${process.env.REACT_APP_API_URL}/api/data/getsimulations/id`;
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      };

      fetch(url, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.error("failed to fetch");
          }
        })
        .then((simulation) => {
          setSimulation(simulation[0]);
          getBlocks(simulation[0].sim_blocks);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const getBlocks = (hashes) => {
    let url = `http://${process.env.REACT_APP_API_URL}/api/data/getblocks`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner: user.email, blocks: hashes }),
    };

    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("failed to fetch");
        }
      })
      .then((blocks) => {
        console.log("FETCHED BLOCKS");
        console.log(blocks);
        setSimulationBlocks(blocks);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // API to Share Simulation
  const shareSimulation = (e) => {
    e.preventDefault();

    let simID = id;

    // Email value
    let email = document.getElementById("email").value;

    let url = `http://${process.env.REACT_APP_API_URL}/api/share`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, sim_id: simID }),
    };
    fetch(url, options)
      .then((res) => {
        console.log(res);

        if (res.ok) {
          setFeedback(true);
          setFeedbackObj({
            message: `Simulation shared`,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteSimulation = (e) => {
    e.preventDefault();
    console.log("TEST");

    // Get Simulation ID
    let simID = id;

    // Delete API Call
    let url = `http://${process.env.REACT_APP_API_URL}/api/data/deletesim`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, sim_id: simID }),
    };

    fetch(url, options)
      .then((res) => {
        console.log(res);

        if (res.ok) {
          setFeedback(true);
          setFeedbackObj({
            message: `Simulation ${id} deleted.`,
            severity: "error",
          });

          // reroute back to simulations list

          history.push(`${process.env.PUBLIC_URL}/simulation`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Auth setUser={setUser}>
      <UserBar
        barTitle={`Simulation ${simulation.sim_name}`}
        tabNames={["Main Chain", "Wallet"]}
        setSelectedTab={(e, newValue) => setSelectedTab(newValue)}
        selectedTab={selectedTab}
        setTheme={setTheme}
      />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            Options
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                toggleDialog();
              }}
            >
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              Share
            </MenuItem>
            <MenuItem sx={{ color: "error.main" }} onClick={deleteSimulation}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <DeleteIcon />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </Box>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Simulation Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Simulation ID: {id}</Typography>
            <Typography variant="body1">
              Simulation Owner: {simulation.email}
            </Typography>
            <Typography variant="body1">
              Simulation Description: {simulation.sim_description}
            </Typography>
            <Typography variant="body1">
              Created:{" "}
              {new Intl.DateTimeFormat("en-US", options).format(
                new Date(simulation.sim_created)
              )}
            </Typography>
            <Typography variant="body1">
              Modified:{" "}
              {new Intl.DateTimeFormat("en-US", options).format(
                new Date(simulation.sim_modified)
              )}
            </Typography>
            <Typography variant="body1">
              Shared With: {simulation.sim_shared}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <TabPanel value={selectedTab} index={0}>
          <Box sx={{ mt: 2 }}>
            <Button color="primary" variant="contained" sx={{ mr: 2 }}>
              Add New Block
            </Button>
            <TextField
              size="small"
              label="Search"
              variant="outlined"
              type="search"
            />
          </Box>
          <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
            {simulationBlocks.length > 0
              ? simulationBlocks.map((block) => (
                  <Box
                    sx={{ mb: 2, mt: 2, mr: 2 }}
                    style={{ display: "inline-block", width: "500px" }}
                  >
                    <BlockComponent
                      block={block}
                      setSelectedTransaction={setSelectedTransaction}
                    />
                  </Box>
                ))
              : null}
          </div>
          {selectedTransaction ? (
            <Container
              maxWidth="md"
              sx={{ m: 2, textAlign: "center", ml: "auto", mr: "auto" }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h4">Transaction Details</Typography>
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{ m: 2 }}
                    size="small"
                    onClick={() => setSelectedTransaction(null)}
                  >
                    Hide Transactions
                  </Button>
                  <Grid container>
                    {selectedTransaction
                      ? selectedTransaction.map((tx, index) => (
                          <Grid
                            item
                            xs={12}
                            sx={{ pl: 1, pr: 1, pt: 0.5, pb: 0.5 }}
                            key={index}
                          >
                            <Grid container>
                              <Grid item xs={3}>
                                <Typography variant="subtitle2">
                                  {tx.transaction_data.owner_UTXO.length > 63
                                    ? "BLOCKCHAIN"
                                    : tx.transaction_data.owner_UTXO}
                                </Typography>
                                <Typography variant="caption">
                                  {tx.transactionAddressFrom}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <ArrowForwardIcon />
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="subtitle2">
                                  {tx.transaction_data.receiver}
                                </Typography>
                                <Typography variant="caption">
                                  {tx.transactionAddressFrom}
                                </Typography>{" "}
                              </Grid>
                              <Grid item xs={3} textAlign="right">
                                <Typography variant="subtitle2">
                                  {tx.transaction_data.amount_received}
                                </Typography>
                                <Typography variant="caption">BTC</Typography>
                              </Grid>
                            </Grid>
                            <Divider />
                          </Grid>
                        ))
                      : "non"}
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          ) : null}
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          Wallet
        </TabPanel>
      </Container>

      {/* Dialog for sharing */}
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To share this simulation, please enter the email address of the
            person you wish to share with.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={toggleDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={shareSimulation}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Auth>
  );
};

export default Simulation;
