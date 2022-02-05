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
import EarningCard from "../WalletCards/TotalBalanceCard";
import TransactionCard from "../WalletCards/TransactionsCard";
import OwnerCard from "../WalletCards/OwnerCard";

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
    <Card sx={{ mt: 3, ml: 5, mr: 5, minHeight: 100, borderRadius: "16px" }}>
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
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <EarningCard />
          <TransactionCard />
          <OwnerCard />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WalletComponent;
