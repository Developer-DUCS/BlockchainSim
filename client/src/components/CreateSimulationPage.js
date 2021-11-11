// import React from "react";
// import { styled } from "@mui/material/styles";
// import { Button, Grid, Container, Paper, Typography } from "@mui/material";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
//   KeyboardTimePicker,
// } from "@material-ui/pickers";
// import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
// import { useHistory } from "react-router-dom";
// import timeStamp from "../js/blockchain/block/timeStamp";
// import simulationCreator from "../js/blockchain/simulation";
// import UserBar from "./UserBar";
// import Auth from "./Auth";

// Name (str)
// Description (str)
// Creation Date of Genesis Block (time + date)
// Window time between block (5/10/15/20)
// Number of Blocks (100 - 500)
// Transactions per blocks (3 - 10)
// Subsidy (1-50)
// Type of Coin (BTC, ETH, ...)
// Kind of mining (proof of work, proof of stake, ...)

// const SimulationFormCreator = (props) => {
//   const { setTheme } = props;
//   const [selectedTab, setSelectedTab] = React.useState(0);

//   const [user, setUser] = React.useState({});

//   //random
//   const [selectedDate, setSelectedDate] = React.useState(new Date());
//   const stampTimes = [];
//   const WINDOW_TIME = 600; //10 Minutes
//   const TIME_VARIATION_WINDOW = 30; //30 Seconds
//   const NUM_BLOCKS = 20;
//   const NUM_MINERS = 100;
//   const initialHash =
//     "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; //TODO: which one is the genesis hash?

//   const [value, setValue] = React.useState(30);

//   const handleDateChange = (date) => {
//     console.log(date);
//     setSelectedDate(date);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let initTime = [e.target.datePick.value, e.target.timePick.value];
//     var timeStampArr = timeStamp(initTime);
//     var simulation = simulationCreator(
//       NUM_BLOCKS,
//       initialHash,
//       timeStampArr,
//       NUM_MINERS
//     );
//     console.log(simulation);
//   };

//   return (
//     <Auth setUser={setUser}>
//       <UserBar
//         barTitle={"Create a Simulation"}
//         tabNames={["My Simulations", "Shared With Me"]}
//         setSelectedTab={(e, newValue) => setSelectedTab(newValue)}
//         selectedTab={selectedTab}
//         setTheme={setTheme}
//       />
//       <Container maxWidth="xs">
// <Paper xs={{ p: 2 }} elevation={2}>
//   <Typography variant="h4" align="center" gutterBottom>
//     New Simulation
//   </Typography>
//   <form onSubmit={(e) => handleSubmit(e)}>
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
// <MuiPickersUtilsProvider utils={DateFnsUtils}>
//   <KeyboardDatePicker
//     name="datePick"
//     label="genesis block creation date"
//     format="MM/dd/yyyy"
//     variant="dialog"
//     value={selectedDate}
//     onChange={handleDateChange}
//   />
//             </MuiPickersUtilsProvider>
//           </Grid>
//           <Grid item xs={12}>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//               <KeyboardTimePicker
//                 name="timePick"
//                 label="genesis block creation date"
//                 ampm={false}
//                 format="HH:mm:ss"
//                 variant="dialog"
//                 value={selectedDate}
//                 onChange={handleDateChange}
//               />
//             </MuiPickersUtilsProvider>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Button
//           color="primary"
//           fullWidth
//           type="submit"
//           variant="contained"
//         >
//           Create Simulation
//         </Button>
//       </Grid>
//     </Grid>
//   </form>
// </Paper>
//       </Container>
//     </Auth>
//   );
// };

// export default SimulationFormCreator;

// import React from "react";
import React, { Fragment, useState } from "react";
import {
  Button,
  Grid,
  Container,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Auth from "./Auth";
import UserBar from "./UserBar";
import MenuItem from "@mui/material/MenuItem";
import { SettingsCellOutlined } from "@material-ui/icons";

const CreateSimulation = (props) => {
  const { setTheme } = props;

  const [user, setUser] = React.useState({});

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

  const [name, setName] = React.useState();
  const [description, setDesc] = React.useState();
  const [createDate, setCreateDate] = React.useState();
  const [ceateTime, setCreateTime] = React.useState();
  const [blocksCount, setBlocksCount] = React.useState();
  const [blocksCountError, setBlocksCountError] = React.useState(false);
  const [transactions, setTransactions] = React.useState();
  const [transactionsError, setTransactionsError] = React.useState(false);
  const [subsidy, setSubsidy] = React.useState();
  const [subsidyError, setSubsidyError] = React.useState(false);
  const [blockWindow, setBlockWindow] = React.useState("10");
  const [coin, setCoin] = React.useState("btc");
  const [mine, setMining] = React.useState("pow");

  const handleChange = (event) => {
    setBlockWindow(event.target.value);
    setCoin(event.target.value);
    setMining(event.target.value);
  };

  const verifyBlocksCount = (blockscount) => {
    if (blockscount > 100 || blockscount < 500) {
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

  const [password, setPassword] = React.useState(false);
  const [verifyPassword, setVerifyPassword] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create account
    // if successful, redirect to login page
    const url = "http://localhost:5000/api/users/register";
    const payload = {
      id: email,
      pass: password,
      role: "dev",
    };
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status == 201) {
        //redirect
        history.push("/signin");
      }
      if (res.status == 409) {
        // username already exist
        // display invalid username
        setEmailError(true);
      }
    });
  };

  // If password or verify password change
  React.useEffect(() => {
    checkPassword();
  }, [password, verifyPassword]);

  // Check if passwords match
  const checkPassword = () => {
    if (password !== verifyPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  // Check if email is valid
  const verifyEmail = (email) => {
    if (email.length > 0) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setEmailError(!re.test(String(email).toLowerCase()));
    } else setEmailError(false);
  };

  return (
    <Auth setUser={setUser}>
      <UserBar barTitle={"Create a Simulation"} setTheme={setTheme} />
      <Container maxWidth="xs">
        <Paper sx={{ p: 2, mt: 2 }} elevation={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Create a Simulation
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
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
                      fullWidth
                      multiline
                      label="Description"
                      name="description"
                      placeholder="Write a short description of the simulation"
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="creationDate"
                      label="Date of Creation of Genesis Block"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      defaultValue={values.someDate}
                      onChange={(e) => {
                        setCreateDate(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="time"
                      label="Time of Creation of Genesis Block"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="time"
                      defaultValue={values.someTime}
                      onChange={(e) => {
                        setCreateTime(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="window"
                      select
                      required
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      placeholder="100"
                      id="numblocks"
                      label="Number of Blocks"
                      type="number"
                      InputProps={{ inputProps: { min: 100, max: 500 } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        blocksCountError
                          ? "*Blockchains must be between 100 and 500 blocks long"
                          : ""
                      }
                      error={blocksCountError}
                      color={blocksCountError ? "error" : "success"}
                      onChange={(e) => {
                        verifyBlocksCount(e.target.value);
                        setBlocksCount(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      placeholder="5"
                      id="numtransactions"
                      label="Number of Transactions per Block"
                      type="number"
                      helperText="between 3 and 10"
                      InputProps={{ inputProps: { min: 3, max: 10 } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        transactionsError
                          ? "*Blocks can have between 3 and 10 transactions"
                          : ""
                      }
                      error={transactionsError}
                      color={transactionsError ? "error" : "success"}
                      onChange={(e) => {
                        verifyTransaction(e.target.value);
                        setTransactions(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      placeholder="50"
                      id="subsidy"
                      label="Set a Subsidy"
                      type="number"
                      helperText="between 1 and 50"
                      InputProps={{ inputProps: { min: 1, max: 50 } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        subsidyError ? "*Subsidies can be between 1 and 50" : ""
                      }
                      error={subsidyError}
                      color={subsidyError ? "error" : "success"}
                      onChange={(e) => {
                        verifySubsidy(e.target.value);
                        setSubsidy(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="coin"
                      select
                      label="Select a type of Coin"
                      value={coin}
                      onChange={handleChange}
                      SelectProps={{
                        native: true,
                      }}
                      // helperText="* in minutes"
                    >
                      {coins.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="mining"
                      select
                      label="Select a type of Verification"
                      value={mine}
                      onChange={handleChange}
                      SelectProps={{
                        native: true,
                      }}
                      // helperText="* in minutes"
                    >
                      {mining.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={blocksCountError}
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
