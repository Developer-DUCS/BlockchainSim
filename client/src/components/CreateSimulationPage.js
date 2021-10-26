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
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const history = useHistory();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = { email, password };

    // API call to login to account
    // if successful, redirect to landing page
    // if not, display error message
    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          throw new Error("Failed to Login!");
        }
      })
      .then(async (res) => {
        console.log(res);

        // Store token in cookie
        window.localStorage.setItem("token", res.token);

        //redirect
        history.push("/landing");
      })
      .catch(async (err) => {
        console.error(err);
      });
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
