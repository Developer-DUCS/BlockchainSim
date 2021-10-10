import { Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const BlockComponent = (props) => {
  // Props for block component
  // - block: Block object
  // {blockNumber: "0x0",
  //  blockDate: "2019-01-01T00:00:00.000Z",
  //  blockMiner: "0x0",
  //  blockMerkleTreeRoot: "0x0",
  //  blockTransactions: [{}],
  //  blockPreviousHash: "0x0",
  //  blockNonce: "0x0",
  //  blockHash: "0x0",}
  const { block } = props;

  return (
    <Paper sx={{ p: 2 }} style={{ overflowWrap: "anywhere" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Block {block.blockNumber}</Typography>
          <Typography variant="subtitle2">{block.blockDate}</Typography>
          <br />
          <Typography variant="subtitle1">Miner: {block.blockMiner}</Typography>
          <Typography variant="h6">Merkle Tree:</Typography>
          <Typography variant="subtitle1">{block.blockMerkleTree}</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} textAlign="center" sx={{ p: 1 }}>
          {block.blockTransactions != undefined
            ? block.blockTransactions.length
            : 0}{" "}
          Transactions
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            sx={{ border: 1, borderRadius: 1, borderColor: "divider" }}
          >
            {block.blockTransactions != undefined
              ? block.blockTransactions.map((tx) => (
                  <Grid item xs={12} sx={{ p: 2 }}>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography variant="subtitle1">
                          {tx.transactionHash}
                        </Typography>
                        <Typography variant="subtitle1">
                          {tx.transactionHash}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ArrowForwardIcon />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle1">
                          {tx.transactionHash}
                        </Typography>
                        <Typography variant="subtitle1">
                          {tx.transactionHash}
                        </Typography>{" "}
                      </Grid>
                      <Grid item xs={3} textAlign="right">
                        <Typography variant="h6">
                          {tx.transactionAmount}
                        </Typography>
                        <Typography variant="subtitle2">BTC</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              : "non"}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <br />
          <Typography variant="h6">Hash of the previous block:</Typography>
          <Typography variant="subtitle1">{block.blockPreviousHash}</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Nonce: {block.blockNonce}</Typography>
          <Typography variant="h6">Hash:</Typography>
          <Typography variant="subtitle1">{block.blockHash}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlockComponent;
