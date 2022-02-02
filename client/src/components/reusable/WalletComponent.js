import { Typography } from "@mui/material";
import { Card, CardContent, Grid } from "@mui/material";
import EarningCard from "../WalletCards/TotalBalanceCard";
import Box from "@mui/material/Box";
import TransactionCard from "../WalletCards/TransactionsCard";

const WalletComponent = (props) => {
  return (
    <Card sx={{ mt: 3, ml: 5, mr: 5, minHeight: 100, borderRadius: "16px" }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <EarningCard></EarningCard>
          <TransactionCard />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WalletComponent;
