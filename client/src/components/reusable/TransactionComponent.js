import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
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
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={() => setSelectedTransaction()}
            sx={{ float: "left" }}
          >
            Hide Transactions
          </Button>
          <Typography variant="h4">Transaction Details</Typography>
          <Typography variant="subtitle2">
            Block{" "}
            {transaction[0].transaction_data
              ? transaction[0].transaction_data.block_height + 1
              : "N/A"}
          </Typography>

          <Box>
            <IconButton color="primary" size="large">
              <AccountTreeIcon fontSize="inherit" />
            </IconButton>
          </Box>

          <Button color="primary" variant="contained" size="small">
            Inputs/Outputs
          </Button>

          <Grid container>
            {transaction
              ? transaction.map((tx, index) => (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      pb: 1,
                      background: index % 2 ? "#ebe8e4" : "inherit",
                    }}
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
                        <Typography variant="caption" sx={{ p: 1 }}>
                          <strong>UTXO:</strong>
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ textAlign: "left", p: 1 }}
                        >
                          {tx.transaction_data.owner_UTXO.slice(0, 15)}...
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
                          <strong>UTXO:</strong>
                        </Typography>
                        <Typography variant="caption" sx={{ p: 1 }}>
                          {tx.transaction_data.receiver.slice(0, 15)}...
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={5}>
                        <Typography
                          variant="caption"
                          sx={{ textAlign: "right", p: 1 }}
                        >
                          <strong>Sent:</strong>
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
                        <Typography variant="caption" sx={{ p: 1 }}>
                          <strong>Fee:</strong>
                        </Typography>
                        <Typography variant="caption" sx={{ p: 1 }}>
                          {tx.transaction_data.fee + "BTC"}
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="caption" sx={{ p: 1 }}>
                          <strong>Received:</strong>
                        </Typography>
                        <Typography variant="caption" sx={{ p: 1 }}>
                          {tx.transaction_data.amount_received + "BTC"}
                        </Typography>
                      </Grid>
                    </Grid>
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
