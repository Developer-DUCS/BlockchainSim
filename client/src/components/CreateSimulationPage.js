// Name (str) *
// Description (str) *
// Creation Date of Genesis Block (time + date) *
// Window time between block (5/10/15/20) *
// Number of Blocks (100 - 500) *
// Transactions per blocks (3 - 10) *
// Subsidy (1-50) *
// Type of Coin (BTC, ETH, ...) *
// Kind of mining (proof of work, proof of stake, ...) *

//things needed to be validated:
//  - number of blocks
//  - number of transactions per blocks
//  - subsidy

import React, { Fragment, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Auth from "./reusable/Auth";
import UserBar from "./reusable/UserBar";
import timeStamp from "../js/blockchain/block/timeStamp";
import simulationCreator from "../js/blockchain/simulation";
import chooseMiner, {
  createMinerPool,
} from "../js/blockchain/block/miningPool";
import sjcl from "../sjcl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { Popover } from "@mui/material";
import InfoButton from "./InfoButton";
import { Link } from "react-router-dom";
const CreateSimulation = (props) => {
  const { setTheme, setFeedback, setFeedbackObj } = props;
  const [user, setUser] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const times = [
    {
      value: "5",
      label: "5",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: "15",
      label: "15",
    },
    {
      value: "20",
      label: "20",
    },
  ];

  const coins = [
    {
      value: "btc",
      label: "Bitcoin (BTC)",
    },
    {
      value: "eth",
      label: "Ethereum (ETH)",
    },
  ];

  const mining = [
    {
      value: "pow",
      label: "Proof of Work",
    },
    {
      value: "pos",
      label: "Proof of Stake",
    },
  ];
  const values = {
    someDate: "2009-01-09",
    someTime: "10:30",
  };

  // var genDate = "2009-01-09";
  var genTime = "10:30";
  const [name, setName] = React.useState();
  const [description, setDesc] = React.useState();
  const [blocksCount, setBlocksCount] = React.useState();
  const [blocksCountError, setBlocksCountError] = React.useState(false);
  const [transactions, setTransactions] = React.useState("5");
  const [transactionsError, setTransactionsError] = React.useState(false);
  const [subsidy, setSubsidy] = React.useState("50");
  const [subsidyError, setSubsidyError] = React.useState(false);
  const [blockWindow, setBlockWindow] = React.useState("10");
  const [coin, setCoin] = React.useState("btc");
  const [mine, setMining] = React.useState("pow");
  const [numMiners, setNumMiners] = React.useState("50");
  const [numMinersError, setNumMinersError] = React.useState(false);
  const [genDate, setGenDate] = React.useState("2009-01-09");
  const NUM_MINERS = 100; //TODO: conect it with form

  const handleChange = (event) => {
    setBlockWindow(event.target.value);
    setCoin(event.target.value);
    setMining(event.target.value);
  };

  const verifyBlocksCount = (blocksCount) => {
    if (blocksCount < 100 || blocksCount > 500) {
      setBlocksCountError(true);
    } else {
      setBlocksCountError(false);
    }
  };
  const verifyTransaction = (transactions) => {
    if (transactions < 3 || transactions > 10) {
      setTransactionsError(true);
    } else {
      setTransactionsError(false);
    }
  };
  const verifySubsidy = (subsidy) => {
    if (subsidy < 1 || subsidy > 50) {
      setSubsidyError(true);
    } else {
      setSubsidyError(false);
    }
  };
  const verifyNumMiners = (numMiners) => {
    if (numMiners < 50 || numMiners > 150) {
      setNumMinersError(true);
    } else {
      setNumMinersError(false);
    }
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    //Creates the simulation
    const initValues = {
      name: name,
      desc: description,
      gendate: genDate,
      gentime: genTime,
      blockwin: blockWindow,
      numblocks: blocksCount,
      transactions: transactions,
      subsidy: subsidy,
      coin: coin,
      mining: mine,
      numminers: numMiners,
    };

    var miningPool = createMinerPool(initValues.numminers, user.email); //create mining pool

    var bithash = sjcl.hash.sha256.hash(initValues.desc);
    var initialHash = sjcl.codec.hex.fromBits(bithash);

    let initTime = [initValues.gendate, initValues.gentime];
    var timeStampArr = timeStamp(
      initTime,
      initValues.numblocks,
      initValues.blockwin
    );
    var simulation = simulationCreator(
      initValues.numblocks,
      initialHash,
      timeStampArr,
      miningPool,
      user.email,
      initValues.transactions
    );

    var newSimulation = {
      user: user.email,
      sim_name: initValues.name,
      sim_shared: {},
      sim_description: initValues.desc,
      sim_created: new Date(),
      sim_modified: new Date(),
      sim_blocks: simulation[0],
    };

    var data = {
      simulation: newSimulation,
      blocks: simulation[1],
    };

    console.log("New Simulation", data);

    // API call to create simulation
    // if successful, redirect to simulation page
    const url = `http://${process.env.REACT_APP_API_URL}/api/data/createsim`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        // Set Feedback Message Properties
        setFeedback(true);
        setFeedbackObj({ message: "Created Simulation!", severity: "success" });

        //redirect
        history.push(`${process.env.PUBLIC_URL}/simulation`);
      }
    });
  };

  return (
    <Auth setUser={setUser}>
      <UserBar barTitle={"Create a Simulation"} setTheme={setTheme} />

      <Container maxWidth="md">
        <Button
          component={Link}
          to={`${process.env.PUBLIC_URL}/simulation`}
          color="secondary"
          variant="contained"
          sx={{ float: 500, mt: 2 }}
        >
          BACK
        </Button>
        <Paper sx={{ p: 2, mt: 2 }} elevation={2}>
          <Typography variant="h4" gutterBottom>
            Create a Simulation
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h3>Basic Information</h3>
                    <Divider />
                    <TextField
                      sx={{ mt: 4, mr: 7 }}
                      style={{ width: "90%" }}
                      required
                      label="Name of Simulation"
                      name="name"
                      autoComplete="off"
                      variant="outlined"
                      placeholder="Ean's Awesome Simulation"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ mt: 2, mr: 7 }}
                      style={{ width: "90%" }}
                      required
                      label="Description"
                      name="description"
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      sx={{ mt: 2, mr: 7 }}
                      style={{ width: "90%" }}
                      name="creationDate"
                      label="Date of Creation of Genesis Block"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      defaultValue={values.someDate}
                      onChange={(e) => {
                        setGenDate(e.target.value);
                      }}
                    />
                    <InfoButton
                      sx={{ ml: -5, mt: 4.5 }}
                      title="Creation Date"
                      description={
                        "This will be the date that the first block was created in the block chain."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "90%" }}
                      sx={{ mt: 2, mr: 7 }}
                      required
                      name="time"
                      label="Time of Creation of Genesis Block"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="time"
                      defaultValue={values.someTime}
                      onBlur={(e) => {
                        genTime = e.target.value;
                        //console.log(genTime);
                      }}
                    />
                    <InfoButton
                      sx={{ ml: -5, mt: 4.5 }}
                      title="Creation Time"
                      description={
                        "This will be the time that the first block was created in the block chain."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "90%" }}
                      sx={{ mt: 2, mr: 7 }}
                      required
                      placeholder="100"
                      id="numblocks"
                      label="Number of Blocks"
                      type="number"
                      InputProps={{ inputProps: { min: 100, max: 500 } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {
                        verifyBlocksCount(e.target.value);
                        setBlocksCount(e.target.value);
                      }}
                      helperText={
                        blocksCountError
                          ? "*Blockchains must be between 100 and 500 blocks long"
                          : ""
                      }
                      error={blocksCountError}
                      color={blocksCountError ? "error" : "success"}
                    />
                    <InfoButton
                      sx={{ ml: -5, mt: 4.5 }}
                      title="Number of Blocks"
                      description={
                        "This number will represent how many blocks will be created in the block chain."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "90%" }}
                      sx={{ mt: 2, mr: 7 }}
                      required
                      id="coin"
                      select
                      label="Select a type of Coin"
                      value={coin}
                      onChange={handleChange}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {coins.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ ml: -2 }}
                      >
                        <h3>Optional Parameters</h3>
                        <Divider />
                      </AccordionSummary>
                      <AccordionDetails sx={{ ml: -1.5 }}>
                        <Grid item xs={12}>
                          <TextField
                            style={{ width: "90%" }}
                            sx={{ mt: -2, mr: 7 }}
                            id="window"
                            select
                            label="Select a time window between blocks"
                            helperText="* in minutes"
                            value={blockWindow}
                            onChange={handleChange}
                            SelectProps={{
                              native: true,
                            }}
                          >
                            {times.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                          <InfoButton
                            sx={{ ml: -5, mt: 0 }}
                            title="Window between Blocks"
                            description={
                              "This number will represent the number of minutes between the creation of each block."
                            }
                          />
                          <TextField
                            style={{ width: "90%" }}
                            sx={{ mt: 2, mr: 7 }}
                            defaultValue={"5"}
                            id="numtransactions"
                            label="Number of Transactions per Block"
                            type="number"
                            InputProps={{ inputProps: { min: 3, max: 10 } }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => {
                              if (e.target.value == "") {
                                setTransactions("5");
                              } else {
                                verifyTransaction(e.target.value);
                                setTransactions(e.target.value);
                              }
                            }}
                            helperText={
                              transactionsError
                                ? "*Blocks can have between 3 and 10 transactions"
                                : ""
                            }
                            error={transactionsError}
                            color={transactionsError ? "error" : "success"}
                          />
                          <InfoButton
                            sx={{ ml: -5, mt: 4.5 }}
                            title="Number of Transactions"
                            description={
                              "This number will represent the number of transactions that each block will store."
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            style={{ width: "90%" }}
                            sx={{ mt: 2, mr: 7 }}
                            id="subsidy"
                            label="Set a Subsidy"
                            type="number"
                            defaultValue={"50"}
                            InputProps={{ inputProps: { min: 1, max: 50 } }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => {
                              if (e.target.value == "") {
                                setSubsidy("50");
                              } else {
                                verifySubsidy(e.target.value);
                                setSubsidy(e.target.value);
                              }
                            }}
                            helperText={
                              subsidyError
                                ? "*Subsidies can be between 1 and 50"
                                : ""
                            }
                            error={subsidyError}
                            color={subsidyError ? "error" : "success"}
                          />
                          <InfoButton
                            sx={{ ml: -5, mt: 4.5 }}
                            title="Subsidy"
                            description={
                              "This number will represent the reward for mining the block."
                            }
                          />
                          <TextField
                            style={{ width: "90%" }}
                            sx={{ mt: 2, mr: 7 }}
                            defaultValue={"50"}
                            id="miners"
                            label="How many miners will be in the simulation:"
                            type="number"
                            helperText="between 50 and 150"
                            InputProps={{ inputProps: { min: 50, max: 150 } }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => {
                              if (e.target.value == "") {
                                setNumMiners("50");
                              } else {
                                verifyNumMiners(e.target.value);
                                setNumMiners(e.target.value);
                              }
                            }}
                            helperText={
                              numMinersError
                                ? "*There must be between 50 and 150 miners in the simulation"
                                : ""
                            }
                            error={numMinersError}
                            color={numMinersError ? "error" : "success"}
                          />
                          <InfoButton
                            sx={{ ml: -5, mt: 4.5 }}
                            title="Number of Miners"
                            description={
                              "This number will represent how many miners will be included in the simulation."
                            }
                          />
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                          <TextField
                            style={{ width: "90%" }}
                            sx={{ mt: 2, mr: 7 }}
                            id="mining"
                            select
                            label="Select a type of Verification"
                            value={mine}
                            onChange={handleChange}
                            SelectProps={{
                              native: true,
                            }}
                          >
                            {mining.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={
                    blocksCountError ||
                    transactionsError ||
                    subsidyError ||
                    numMinersError
                  }
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Create New Simulation
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Auth>
  );
};
export default CreateSimulation;
