import React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Slider,
  Box,
  Grid,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router-dom";
import timeStamp from "../js/blockchain/block/timeStamp";

const CreateSimulation = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const stampTimes = [];
  const WINDOW_TIME = 600; //10 Minutes
  const TIME_VARIATION_WINDOW = 30; //30 Seconds
  const NUM_BLOCKS = 500;

  const [value, setValue] = React.useState(30);

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let initTime = [e.target.datePick.value, e.target.timePick.value];
    timeStamp(initTime);
  };

  return (
    <Container maxWidth="xs">
      <Paper xs={{ p: 2 }} elevation={2}>
        <Typography variant="h4" align="center" gutterBottom>
          New Simulation
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="datePick"
                      label="genesis block creation date"
                      format="MM/dd/yyyy"
                      variant="dialog"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={16}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      name="timePick"
                      label="genesis block creation date"
                      ampm={false}
                      format="HH:mm:ss"
                      variant="dialog"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"
              >
                Create Simulation
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateSimulation;
