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
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Auth from "../reusable/Auth.js";
import TotalBalanceCard from "./TotalBalanceCard";
import TransactionButton from "./TransactionButton";
import AddressesCard from "./AddressesCard";
import LedgerCard from "./LedgerCard";

const WalletCard = (props) => {
  const theme = useTheme();
  const [user, setUser] = React.useState({});
  const { id } = useParams();

  //array of all wallet card objects
  const [wallets, setWallets] = React.useState([]);

  //stores information gained from database
  const [miners, setMiners] = React.useState([]);
  const [miner, setMiner] = React.useState([]);
  const [balance, setBalance] = React.useState(0);
  const [addresses, setAddresses] = React.useState([]);
  const [personalLedger, setpersonalLedger] = React.useState([]);

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
          let totalCoin = 0;
          for (let i = 0; i < wallets.length; i++) {
            totalCoin += wallets[i].balance;
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
        setAddresses(wallets[i].addresses.slice(0, 4));
        setpersonalLedger(wallets[i].personal_ledger.reverse().slice(0, 4));
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
      <Card sx={{ mt: 1, ml: 2, borderRadius: "16px" }}>
        <CardContent>
          <Grid container rowSpacing={-1} spacing={2}>
            <Grid item lg={6}>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 500,
                }}
              >
                <b style={{ color: theme.palette.primary }}>MINER: </b>
                <b>{miner}</b>
              </Typography>
            </Grid>
            <Grid item lg={6}>
              <FormControl sx={{ color: "primary", width: "100%" }}>
                <InputLabel size="large" id="caregoryLabel">
                  Miner
                </InputLabel>
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
              </FormControl>
            </Grid>
          </Grid>
          <Grid container rowSpacing={-1} spacing={2}>
            <Grid item lg={6}>
              <TotalBalanceCard sx={{ width: "100%" }} balance={balance} />
            </Grid>
            <Grid item lg={6}>
              <Grid item>
                <TransactionButton
                  sx={{ width: "100%" }}
                  type="Pay"
                  miners={miners}
                />
              </Grid>
              <Grid item>
                <TransactionButton
                  sx={{ mt: 3.5, width: "100%" }}
                  type="Request"
                  miners={miners}
                />
              </Grid>
            </Grid>
            <Grid item lg={6}>
              <AddressesCard
                sx={{ width: "100%", height: 300 }}
                addresses={addresses}
              />
            </Grid>
            <Grid item lg={6}>
              <LedgerCard
                sx={{
                  width: "100%",
                  height: 300,
                }}
                ledger={personalLedger}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Auth>
  );
};

export default WalletCard;
