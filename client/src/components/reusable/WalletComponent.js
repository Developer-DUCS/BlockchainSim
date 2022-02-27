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
import { useParams } from "react-router-dom";
import Auth from "./Auth";
import TotalBalanceCard from "../WalletCards/TotalBalanceCard";
import TransactionCard from "../WalletCards/TransactionsCard";
import OwnerCard from "../WalletCards/OwnerCard";
import TransactionButton from "../WalletCards/TransactionButton";
import AddressesCard from "../WalletCards/AddressesCard";
import LedgerCard from "../WalletCards/LedgerCard";

const WalletComponent = (props) => {
  const [user, setUser] = React.useState({});
  const { id } = useParams();
  const [wallets, setWallets] = React.useState([]);
  const [miners, setMiners] = React.useState([]);
  const [miner, setMiner] = React.useState([]);
  const [balance, setBalance] = React.useState(0);
  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    if (user.email) {
      let url = `http://${process.env.REACT_APP_API_URL}/api/data/getwallets/id`;
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
        .then((wallets) => {
          setWallets(wallets);
          const minersArr = [];
          for (let i = 0; i < wallets.length; i++) {
            minersArr.push(wallets[i].owner);
          }
          setMiners(minersArr);
        });
    }
  }, [user]);

  React.useEffect(() => {
    for (let i = 0; i < wallets.length; i++) {
      if (wallets[i].owner == miner) {
        setBalance(wallets[i].balance);
        setAddresses(wallets[i].addresses);
      }
    }
  }, [miner]);

  const handleMinerChange = (event) => {
    const {
      target: { value },
    } = event;
    setMiner(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Auth setUser={setUser}>
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
              <TotalBalanceCard sx={{ width: "100%" }} balance={balance} />
            </Grid>
            <Grid item lg={6}>
              <TransactionCard sx={{ width: "100%" }} />
            </Grid>
            <Grid item lg={6}>
              <AddressesCard
                sx={{ width: "100%", height: 500 }}
                addresses={addresses}
              />
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
    </Auth>
  );
};

export default WalletComponent;
