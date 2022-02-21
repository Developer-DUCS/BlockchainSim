import React from "react";
import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import TotalBalanceCard from "../WalletCards/TotalBalanceCard";
import TransactionCard from "../WalletCards/TransactionsCard";
import OwnerCard from "../WalletCards/OwnerCard";
import TransactionButton from "../WalletCards/TransactionButton";
import AddressesCard from "../WalletCards/AddressesCard";
import LedgerCard from "../WalletCards/LedgerCard";

const WalletComponent = (props) => {
  const miners = ["ean@drury.edu", "t5qcwgfkqh", "f3v80882q9"];
  const [miner, setMiner] = React.useState(["ean@drury.edu"]);

  const handleMinerChange = (event) => {
    const {
      target: { value },
    } = event;
    setMiner(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Card sx={{ mt: 3, ml: 5, mr: 5, borderRadius: "16px", width: "75%" }}>
      <CardContent>
        <Grid>
          <FormControl sx={{ ml: 3, color: "primary" }}>
            <InputLabel size="large" id="caregoryLabel">
              Miner
            </InputLabel>
            <Select
              sx={{ width: 400 }}
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
          </FormControl>
        </Grid>
        <Grid container rowSpacing={-1} spacing={2}>
          <Grid item lg={6}>
            <TotalBalanceCard sx={{ width: "100%" }} />
          </Grid>
          <Grid item lg={6}>
            <TransactionCard sx={{ width: "100%" }} />
          </Grid>
          <Grid item lg={6}>
            <AddressesCard sx={{ width: "100%", height: 500 }} />
          </Grid>
          <Grid item lg={6}>
            <LedgerCard sx={{ width: "100%", height: 500 }} />
          </Grid>
          <Grid item lg={6}>
            <TransactionButton sx={{ width: "100%" }} />
          </Grid>
          <Grid item lg={6}>
            <TransactionButton sx={{ width: "100%" }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WalletComponent;
