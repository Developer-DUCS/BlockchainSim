import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TransactionComponent = ({
  transaction,
  setSelectedTransaction,
  setShowInputsOutputs,
}) => {
  React.useEffect(() => {
    console.log(transaction);
  }, []);
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ textAlign: "center", position: "relative" }}>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={() => setSelectedTransaction()}
          sx={{ left: 20, position: "absolute", top: 20 }}
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
                      {tx.transaction_data.addresses_input_UTXO.map(
                        (utxo, index) => (
                          <React.Fragment key={index}>
                            {utxo ==
                            "000000000000000000000000000000000000000000000000000000000000000000000000000000" ? (
                              <Grid container>
                                <Grid item xs={6} sx={{ textAlign: "right" }}>
                                  <Typography variant="caption" sx={{ pr: 1 }}>
                                    <strong>Address:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: "left" }}>
                                  <Typography variant="caption">
                                    BLOCKCHAIN
                                  </Typography>
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid container>
                                <Grid item xs={6} sx={{ textAlign: "right" }}>
                                  <Typography variant="caption" sx={{ pr: 1 }}>
                                    <strong>Address[{index + 1}]:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: "left" }}>
                                  <Typography variant="caption">
                                    {utxo.slice(0, 15)}...
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                          </React.Fragment>
                        )
                      )}
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
                      <Grid container>
                        <Grid item xs={6} sx={{ textAlign: "right" }}>
                          <Typography variant="caption" sx={{ pr: 1 }}>
                            <strong>Address[1]:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "left" }}>
                          <Typography variant="caption">
                            {tx.transaction_data.receiver_address.slice(0, 15)}
                            ...
                          </Typography>
                        </Grid>
                      </Grid>
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
                    <Grid item xs={2}>
                      <Typography variant="caption" sx={{ p: 1 }}>
                        {tx.transaction_data.addresses_input_UTXO[0] ==
                        "000000000000000000000000000000000000000000000000000000000000000000000000000000" ? (
                          <strong>Fees:</strong>
                        ) : (
                          <strong>Fee:</strong>
                        )}
                      </Typography>
                      <Typography variant="caption" sx={{ p: 1 }}>
                        {tx.transaction_data.fee.toFixed(5) + "BTC"}
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
                  <Divider />
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ p: 1 }}>
                        <strong>Leftover Address:</strong>
                      </Typography>
                      <Typography variant="caption" sx={{ p: 1 }}>
                        {tx.transaction_data.sender_leftover_address ==
                        "000000000000000000000000000000000000000000000000000000000000000000000000000000"
                          ? "BLOCKCHAIN"
                          : tx.transaction_data.sender_leftover_address.slice(
                              0,
                              15
                            ) + "..."}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowInputsOutputs(tx);
                        }}
                      >
                        <AccountTreeIcon fontSize="inherit" />
                      </Button>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ p: 1 }}>
                        <strong>Leftover Amount:</strong>
                      </Typography>
                      <Typography variant="caption" sx={{ p: 1 }}>
                        {parseFloat(tx.transaction_data.sender_leftover) +
                          "BTC"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))
            : "non"}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TransactionComponent;
