import { Typography } from "@mui/material";
import { Card, CardContent, Grid } from "@mui/material";
import EarningCard from "../WalletCards/EarningCards";
import Box from "@mui/material/Box";

const WalletComponent = (props) => {
  return (
    <Card sx={{ mt: 3, ml: 5, mr: 5, minHeight: 100 }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <EarningCard sx={{ ml: 10, width: 100 }}></EarningCard>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WalletComponent;
