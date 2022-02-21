import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TransactionComponent = ({ transaction, setSelectedTransaction }) => {
  React.useEffect(() => {
    console.log(transaction);
  }, []);
  return (
    <Container
      maxWidth="md"
      sx={{ m: 2, textAlign: "center", ml: "auto", mr: "auto" }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4">Transaction Details</Typography>
          <Typography variant="subtitle2">
            for block{" "}
            {transaction[0].transaction_data
              ? transaction[0].transaction_data.block_height
              : "N/A"}
          </Typography>

          <Button
            color="secondary"
            variant="contained"
            sx={{ m: 2 }}
            size="small"
            onClick={() => setSelectedTransaction()}
          >
            Hide Transactions
          </Button>
          <Grid container>
            {transaction
              ? transaction.map((tx, index) => (
                  <Grid
                    item
                    xs={12}
                    sx={{ pl: 1, pr: 1, pt: 0.5, pb: 0.5 }}
                    key={index}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          variant="caption"
                          sx={{ p: 1, float: "left" }}
                        >
                          <strong>Hash:</strong>
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ p: 1, float: "left" }}
                        >
                          {tx.hash}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography
                          variant="caption"
                          sx={{ textAlign: "left", p: 1 }}
                        >
                          {tx.transaction_data.owner_UTXO.slice(0, 20)}...
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ textAlign: "right", p: 1 }}
                        >
                          {tx.transaction_data.amount_sent + "BTC"}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ArrowForwardIcon />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="caption" sx={{ p: 1 }}>
                          {tx.transaction_data.receiver.slice(0, 20)}...
                        </Typography>
                        <Typography variant="caption" sx={{ p: 1 }}>
                          {tx.transaction_data.amount_received + "BTC"}
                        </Typography>
                        <Typography variant="caption" sx={{ p: 1 }}>
                          {tx.transactionAddressFrom}
                        </Typography>{" "}
                      </Grid>
                    </Grid>

                    <Divider />
                  </Grid>
                ))
              : "non"}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TransactionComponent;
