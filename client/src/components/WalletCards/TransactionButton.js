import React from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControl,
  Select,
  InputLabel,
  Checkbox,
  OutlinedInput,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";

// project imports
import MainCard from "./MainCard";

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: "#fff",
  position: "relative",
  borderRadius: "16px",
}));

const TransactionButton = (props) => {
  const { sx, type, miners } = props;
  const theme = useTheme();

  const [miner, setMiner] = React.useState([]);
  const [dialog, setDialog] = React.useState(false);
  const [coin, setCoin] = React.useState("btc");

  const title = type == "Pay" ? "Make a Transaction" : "Request a Transaction";
  const description =
    type == "Pay"
      ? "To Create a transaction select a miner/owner that you wish to send currency to"
      : "To request a payment select a miner/owner you wish to request currency from";

  const coins = [
    {
      value: "btc",
      label: "Bitcoin (BTC)",
    },
    {
      value: "usd",
      label: "Dollars (USD)",
    },
  ];

  const toggleDialog = () => {
    dialog ? setDialog(false) : setDialog(true);
  };

  const handleCoinChange = (event) => {
    setCoin(event.target.value);
  };

  const handleMinerChange = (event) => {
    const {
      target: { value },
    } = event;
    setMiner(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <CardWrapper border={false} content={false} sx={sx}>
        <Box
          sx={{
            textTransform: "none",
            color: "white",
            p: 2,
            ":hover": {
              color: "gray",
              boxShador: 3,
            },
          }}
          onClick={() => {
            toggleDialog();
          }}
        >
          <List sx={{ py: 0 }}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                  }}
                >
                  <Icon icon="fa6-solid:money-bill-transfer" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  py: 0,
                  mt: 0.45,
                  mb: 0.45,
                }}
                primary={
                  <Typography
                    sx={{
                      fontSize: "1.50rem",
                      fontWeight: 500,
                      mr: 1,
                      mb: 0.75,
                    }}
                  >
                    {title}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </CardWrapper>

      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle>
          {type == "Pay" ? "Make a Transaction" : "Request a Transaction"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 500 }}>
            {description}
          </DialogContentText>
          {/* Send money to/from
          TO DO:
          - Verify that a user has enough to send
          - Add functionality to 'confirm button'
          - Actually do something with that data */}
          <DialogContentText sx={{ mt: 2 }}>
            <FormControl sx={{ color: "primary", width: "100%" }}>
              <Grid container>
                <Grid item sm={3}>
                  <InputLabel size="large">Miner</InputLabel>
                  <Select
                    sx={{ width: "100%" }}
                    size="large"
                    labelId="minerLabel"
                    id="Miner"
                    value={miner}
                    onChange={handleMinerChange}
                    input={<OutlinedInput size="small" label="Miner" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {miners.map((mine) => (
                      <MenuItem key={mine} value={mine}>
                        <Checkbox checked={miner.indexOf(mine) > -1} />
                        <ListItemText primary={mine} />
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    required
                    sx={{ ml: "3%", width: "97%" }}
                    label="Amount"
                  />
                </Grid>
                <Grid item sm={3}>
                  <TextField
                    sx={{ ml: "3%", width: "97%" }}
                    required
                    id="coin"
                    select
                    label="Currency"
                    value={coin}
                    onChange={handleCoinChange}
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
              </Grid>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={toggleDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransactionButton;
