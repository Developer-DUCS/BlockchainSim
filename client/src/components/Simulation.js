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

  // This placeholder data will be replaced by fetch (to get the block data associated with simulation ID)
  // Test Date for blocks
  const demoBlock = {
    blockNumber: "14",
    blockDate: "28/09/21 06:04:11",
    blockMiner: "lsgh0325",
    blockMerkleTree:
      "0000180d78f908b719c223bcc1aaac0b668ad40ab63891d6c19900228728440",
    blockTransactions: [
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "6.25",
        transactionNameFrom: "New",
        transactionNameTo: "hjy764",
        transactionAddressFrom: "Block Reward",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "ipp098",
        transactionNameTo: "New",
        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "Seth",
        transactionNameTo: "Ean",
        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
    ],
    blockPreviousHash: "000000f575cf1e27b85c8ad98a98djf9au9h9ajsdofj",
    blockNonce: "23529",
    blockHash:
      "000099d89ffda35707d4ffa5ae51667d4c179e0ebd7b4799b85e11675633f7dc",
  };

  const demoBlock2 = {
    blockNumber: "189",
    blockDate: "28/09/21 06:04:11",
    blockMiner: "oisjd",
    blockMerkleTree:
      "0000180d78f908b719c223bcc1aaac0b668ad40ab63891d6c19900228728440",
    blockTransactions: [
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "294",
        transactionNameFrom: "New",
        transactionNameTo: "hjy764",
        transactionAddressFrom: "Block Reward",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "ipp098",
        transactionNameTo: "New",

        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "Seth",
        transactionNameTo: "Ean",
        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "ipp098",
        transactionNameTo: "New",
        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "Seth",
        transactionNameTo: "Ean",
        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
    ],
    blockPreviousHash: "000000f575cf1e27b85c8ad98a98djf9au9h9ajsdofj",
    blockNonce: "23529",
    blockHash:
      "000099d89ffda35707d4ffa5ae51667d4c179e0ebd7b4799b85e11675633f7dc",
  };
  return (
    <Auth setUser={setUser}>
      <UserBar
        barTitle={`Simulation ${id}`}
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
            <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <DeleteIcon onClick={deleteSimulation} />
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
            <Typography variant="body1">Simulation ID: 7</Typography>
            <Typography variant="body1">Number of transactions: 183</Typography>
            <Typography variant="body1">Number of blocks: 183</Typography>
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
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent
                block={demoBlock}
                setSelectedTransaction={setSelectedTransaction}
              />
            </Box>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent
                block={demoBlock2}
                setSelectedTransaction={setSelectedTransaction}
              />
            </Box>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent
                block={demoBlock}
                setSelectedTransaction={setSelectedTransaction}
              />
            </Box>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent
                block={demoBlock2}
                setSelectedTransaction={setSelectedTransaction}
              />
            </Box>
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
                                  {tx.transactionNameFrom}
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
                                  {tx.transactionNameTo}
                                </Typography>
                                <Typography variant="caption">
                                  {tx.transactionAddressTo}
                                </Typography>{" "}
                              </Grid>
                              <Grid item xs={3} textAlign="right">
                                <Typography variant="subtitle2">
                                  {tx.transactionAmount}
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
