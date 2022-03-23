import React from "react";
import { Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Auth from "./Auth";
import WalletCard from "../WalletCards/WalletCard";

const Wallet_Card = () => {
  return (
    <Grid item sm={8}>
      <WalletCard />
    </Grid>
  );
};

const WalletComponent = (props) => {
  const [user, setUser] = React.useState({});
  const [walletCards, setWalletCards] = React.useState(1);
  const rows = [];

  const onAddBtnClick = (event) => {
    setWalletCards(walletCards + 1);
  };

  return (
    <Auth setUser={setUser}>
      <Box sx={{ ml: 4, mt: 2 }}>
        <Button
          onClick={onAddBtnClick} //need to add a new card here
          variant="contained"
          sx={{ borderRadius: 9, size: 1 }}
        >
          Add Wallet
        </Button>
      </Box>
      <Box sx={{ overflow: "auto", whiteSpace: "nowrap", m: 2 }}>
        {[...Array(walletCards)].map(() => (
          <Box style={{ display: "inline-block", width: "900px" }}>
            <WalletCard />
          </Box>
        ))}
      </Box>
    </Auth>
  );
};

export default WalletComponent;
