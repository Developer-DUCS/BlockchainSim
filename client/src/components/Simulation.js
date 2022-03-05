import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Card,
  Chip,
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
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
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
import LinearProgress from "@mui/material/LinearProgress";
import WalletComponent from "./reusable/WalletComponent";
import createBlock from "../js/blockchain/block/createBlock";
import DataGrid from "./reusable/datagrid";
import TransactionComponent from "./reusable/TransactionComponent";
import { ContactsOutlined } from "@material-ui/icons";

const Simulation = (props) => {
  const history = useHistory();
  const { setTheme, setFeedback, setFeedbackObj } = props;
  const [user, setUser] = React.useState({});
  const { id } = useParams();
  const [category, setCategory] = React.useState(["hash"]);
  const [searchResults, setSearchResults] = React.useState("");

  // Used for UserBar component to keep track of selected tab - Set Default to default tab index
  const [selectedTab, setSelectedTab] = React.useState(0);

  // Used to click transactions
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  // Used to hold simulation blocks
  const [simulationBlocks, setSimulationBlocks] = React.useState([]);

  // Main blocks data, used for display/filtering of blocks
  const [filteredBlocks, setFilteredBlocks] = React.useState([]);

  // Used for refreshing
  const [refresh, setRefresh] = React.useState(false);

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

  const categories = ["hash", "block number"];

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
          getBlocks(simulation[0].sim_blocks, simulation[0].email);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (refresh) setRefresh(false);
  }, [user, refresh]);

  const getBlocks = (hashes, owner) => {
    let url = `http://${process.env.REACT_APP_API_URL}/api/data/getblocks`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner: owner, blocks: hashes }),
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
        // Add block number
        blocks.map((block, index) => {
          block.number = index + 1;
        });
        setSimulationBlocks(blocks);
        setFilteredBlocks(blocks);
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
        if (res.ok) {
          setFeedback(true);
          setFeedbackObj({
            message: `Simulation shared`,
          });
          toggleDialog();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteSimulation = (e) => {
    e.preventDefault();

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
        if (res.ok) {
          setFeedback(true);
          setFeedbackObj({
            message: `Simulation ${id} deleted.`,
            severity: "error",
          });

          // reroute back to simulations list
          history.push(`${process.env.PUBLIC_URL}/simulation`);
        } else {
          if (res.status == 403) {
            setFeedback(true);
            setFeedbackObj({
              message: `You do not have permission to delete this simulation`,
              severity: "error",
            });
            handleClose();
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewBlock = (e) => {
    e.preventDefault();

    // Get sim id and user id
    let simID = id;

    // Fetch previousHash, timestamp, block height, subsidy, halvings
    // Add block API Call
    let url = `http://${process.env.REACT_APP_API_URL}/api/data/latestblockinfo`;
    let getData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, sim_id: simID }),
    };

    fetch(url, getData)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        // Create block
        let subsidy = res.subsidy;
        let halvings = res.halvings;
        let previousHash = res.previousHash;
        let num_transactions = res.num_transactions;
        let block_height = res.block_height;
        let timeStamp = res.timeStamp;
        let miningPool = res.miningPool;
        let wallets = res.wallets;

        console.log("MINING POOL : " + miningPool);
        console.log("WALLETS : " + wallets);

        let newBlock = createBlock(
          previousHash,
          timeStamp,
          num_transactions,
          block_height,
          subsidy,
          halvings,
          miningPool,
          wallets
        );

        // Send block info to API
        let url = `http://${process.env.REACT_APP_API_URL}/api/data/addnewblock`;
        let createData = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            sim_id: simID,
            hash: newBlock[1],
            block: newBlock[0],
          }),
        };
        console.log("TRANSACTIONS: " + JSON.stringify(newBlock[0].transaction));
        fetch(url, createData)
          .then((res) => {
            if (res.ok) {
              // Refresh blocks
              // Need help here don't know how to refresh
              console.log("begin refresh blocks");
              setRefresh(true);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const searchBlocks = () => {
    let search_value = document.getElementById("search").value;
    let category_value = category;
    let temp = [];
    if (category_value == "hash") {
      simulationBlocks.map((block) => {
        if (block.hash.includes(search_value)) {
          temp.push(block);
        }
      });
      setFilteredBlocks(temp);
      setSearchResults(temp.length);
    } else if (category_value == "block number") {
      simulationBlocks.map((block) => {
        if (block.number.toString().includes(search_value)) {
          temp.push(block);
        }
      });
      setFilteredBlocks(temp);
      setSearchResults(temp.length);
    } else {
      setFilteredBlocks(simulationBlocks);
      setSearchResults(0);
    }
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    if (simulationBlocks.length > 0) {
      searchBlocks();
    }
  }, [category]);

  const handleResultsDelete = () => {
    setFilteredBlocks(simulationBlocks);
    setSearchResults("");
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
      {simulation.email == "" ? (
        <LinearProgress sx={{ m: 5 }} />
      ) : (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={(e) => {
              history.goBack();
            }}
          >
            Back
          </Button>
          <TabPanel value={selectedTab} index={0}>
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
                <MenuItem
                  sx={{ color: "error.main" }}
                  onClick={deleteSimulation}
                >
                  <ListItemIcon sx={{ color: "error.main" }}>
                    <DeleteIcon />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>
            </Box>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {simulation.sim_name}
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block", float: "right" }}
                  >
                    Created on {simulation.sim_created}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1">
                  {simulation.sim_description}
                </Typography>
              </CardContent>
            </Card>

            <Box sx={{ mt: 2 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={addNewBlock}
                sx={{ mr: 2 }}
              >
                Add New Block
              </Button>
              <Box sx={{ mt: 2 }}>
                <TextField
                  size="small"
                  label="Search"
                  variant="outlined"
                  type="search"
                  id="search"
                  onChange={searchBlocks}
                  sx={{ mr: 1, mb: 1 }}
                />
                <FormControl sx={{ width: 229, mb: 1 }}>
                  <InputLabel size="small" id="categoryLabel">
                    Category
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="categoryLabel"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput size="small" label="Category" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        <Checkbox checked={category.indexOf(cat) > -1} />
                        <ListItemText primary={cat} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {searchResults != "" ? (
              <Typography variant="overline">
                <Chip
                  label={searchResults}
                  onDelete={handleResultsDelete}
                  sx={{ mb: 1 }}
                />
              </Typography>
            ) : (
              <></>
            )}
            {filteredBlocks.length > 0 ? (
              <DataGrid
                blocks={filteredBlocks}
                setSelectedTransaction={setSelectedTransaction}
              />
            ) : null}
            {selectedTransaction ? (
              <TransactionComponent
                transaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
              />
            ) : null}
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            <WalletComponent />
          </TabPanel>
        </Container>
      )}

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
