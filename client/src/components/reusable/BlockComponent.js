import { Divider, Grid, Button, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const BlockComponent = (props) => {
  const { block, setSelectedTransaction } = props;

  const [waitForParse, setWaitForParse] = React.useState(true);

  React.useEffect(() => {
    if (block.header) {
      block.header = JSON.parse(block.header);
      block.transactions = JSON.parse(block.transactions);
      setWaitForParse(false);
      console.log(block);
    }
  }, [block]);

  //   hash: "00225e6fc1937323dc5f86931479e875c387b6216b80ab35b67c2a4897801046"
  // header: "{\"time\": \"2b80475f\", \"nonce\": \"ae352fcf\", \"target\": \"00000000\", \"version\": \"00000020\", \"merkleTree\": \"113459eb7bb31bddee85ade5230d6ad5d8b2fb52879e00a84ff6ae1067a210d3\", \"previousHash\": \"0122bc563d110768b6ac5dbd398b8b0b5f5479fb80ef5fabe77114ea5e1f9cc3\"}"
  // miner: "1tuhgcl6rq"
  // time_created: "2009-02-10T10:49:18.000Z"
  // transaction_counter: 1
  // transactions: "[\"01

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
              <br />
              <Typography variant="caption">Miner: {block.miner}</Typography>
              <Typography variant="subtitle2">Merkle Tree:</Typography>
              <Typography variant="caption">
                {block.header.merkleTree}
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
                color="secondary"
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
