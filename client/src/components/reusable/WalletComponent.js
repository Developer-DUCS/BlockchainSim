import React from "react";
import { Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
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
  const [WalletCards, setWalletCards] = React.useState([]);
  const rows = [];

  const onAddBtnClick = (event) => {
    setWalletCards(
      WalletCards.concat(<Wallet_Card key={WalletCards.length} />)
    );
  };

  return (
    <Auth setUser={setUser}>
      <Grid container>
        <Grid item sm={8}>
          <WalletCard />
        </Grid>
        {WalletCards}
        <Grid item sm={4}>
          <Button
            onClick={onAddBtnClick} //need to add a new card here
            variant="contained"
            sx={{ borderRadius: 9, size: 1 }}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Auth>
  );
};

export default WalletComponent;
