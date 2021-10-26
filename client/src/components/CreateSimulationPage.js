import React from "react";
import {
  Button,
  Grid,
  TextField,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router-dom";

const CreateSimulation = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 2 }} elevation={2}>
        <Typography variant="h4" align="center" gutterBottom>
          New Simulation
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={16}>
              <Grid container spacing={2}>
                <Grid item xs={16}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      id="datetime-picker"
                      label="genesis block creation date"
                      ampm={true}
                      format="MM/dd/yyyy hh:mm:ss am/pm"
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
