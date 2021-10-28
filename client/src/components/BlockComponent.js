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
    <Paper
      sx={{ p: 2 }}
      style={{ whiteSpace: "break-spaces", overflowWrap: "anywhere" }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">
            Block {block.blockNumber}{" "}
            <Typography variant="caption">{block.blockDate}</Typography>
          </Typography>
          <Typography variant="caption">Miner: {block.blockMiner}</Typography>
          <Typography variant="subtitle2">Merkle Tree:</Typography>
          <Typography variant="caption">{block.blockMerkleTree}</Typography>
          <Divider sx={{ bgcolor: "primary.main" }} />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="caption">
            {block.blockTransactions != undefined
              ? block.blockTransactions.length
              : 0} Transactions
          </Typography>
          <Divider sx={{ bgcolor: "primary.main" }} />
        </Grid>
        <Grid item xs={12} style={{ maxHeight: "80px", overflow: "auto" }}>
          <Grid container>
            {block.blockTransactions != undefined
              ? block.blockTransactions.map((tx, index) => (
                <Grid item xs={12} sx={{ pl: 1, pr: 1, pt: 0.5, pb: 0.5 }}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2">
                        {tx.transactionNameFrom}
                      </Typography>
                      <Typography variant="caption">
                        {tx.transactionAddressFrom}
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
                      <Typography variant="subtitle2">
                        {tx.transactionNameTo}
                      </Typography>
                      <Typography variant="caption">
                        {tx.transactionAddressTo}
                      </Typography>
                      {" "}
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Typography variant="subtitle2">
                        {tx.transactionAmount}
                      </Typography>
                      <Typography variant="caption">BTC</Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </Grid>
              ))
              : "non"}
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ pt: 1 }}>
          <Typography variant="subtitle2">
            Hash of the previous block:
          </Typography>
          <Typography variant="caption">{block.blockPreviousHash}</Typography>
          <Divider sx={{ bgcolor: "primary.main" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">Nonce: {block.blockNonce}</Typography>
          <Typography variant="subtitle2">Hash:</Typography>
          <Typography variant="caption">{block.blockHash}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlockComponent;
