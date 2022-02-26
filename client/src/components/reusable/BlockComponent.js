// CURRENT BLOCK DESIGN
// UNKNOWN??

import { Divider, Grid, Button, Paper, Typography } from "@mui/material";
import React from "react";
const BlockComponent = (props) => {
  const { block, setSelectedTransaction } = props;

  const [waitForParse, setWaitForParse] = React.useState(true);

  React.useEffect(() => {
    if (block.header) {
      try {
        block.header = JSON.parse(block.header);
        block.transactions = JSON.parse(block.transactions);
        console.log("transactions", block.transactions);
        setWaitForParse(false);
      } catch (e) {
        setWaitForParse(false);
      }
    }
  }, [block]);

  return (
    <>
      {waitForParse ? undefined : (
        <Paper
          sx={{ p: 2 }}
          style={{ whiteSpace: "break-spaces", overflowWrap: "anywhere" }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="caption">{block.time_created}</Typography>
              <Typography variant="subtitle2" sx={{ float: "right" }}>
                #{block.number}
              </Typography>
              <br />
              <Typography variant="caption">Miner: {block.miner}</Typography>
              <Typography variant="subtitle2">Merkle Root:</Typography>
              <Typography variant="caption">
                {block.header.merkleRoot}
              </Typography>
              <Divider sx={{ bgcolor: "primary.main" }} />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="caption">
                {block.transactions != undefined
                  ? block.transactions.length
                  : 0}{" "}
                Transactions
              </Typography>
              <Divider sx={{ bgcolor: "primary.main" }} />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                color="primary"
                variant="contained"
                sx={{ m: 1 }}
                size="small"
                onClick={() => setSelectedTransaction(block.transactions)}
              >
                View Transactions
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ pt: 1 }}>
              <Typography variant="subtitle2">
                Hash of the previous block:
              </Typography>
              <Typography variant="caption">
                {block.header.previousHash}
              </Typography>
              <Divider sx={{ bgcolor: "primary.main" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">
                Nonce: {block.header.nonce}
              </Typography>
              <Typography variant="subtitle2">Hash:</Typography>
              <Typography variant="caption">{block.hash}</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default BlockComponent;
