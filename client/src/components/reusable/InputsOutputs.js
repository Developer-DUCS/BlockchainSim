import React from "react";
import { Grid, Box, Card, CardContent, LinearProgress } from "@mui/material";
import Xarrow from "react-xarrows";

const InputsOutputs = ({ transaction, blockData }) => {
  const [blockNumber, setBlockNumber] = React.useState(0);
  const [totalBlocks, setTotalBlocks] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log("inputs/outputs:transaction", transaction);
    console.log("inputs/outputs:blocks", blockData);
    setBlockNumber(transaction[0].transaction_data.block_height + 1);
    setTotalBlocks(blockData.length);
    setLoading(false);
  }, [transaction]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  id="parent"
                  sx={{
                    width: 50,
                    height: 50,
                    background: "orange",
                    margin: "0 auto",
                    textAlign: "center",
                    lineHeight: "50px",
                  }}
                >
                  {blockNumber}
                </Box>
              </Grid>
            </Grid>
            <div style={{ height: 150 }}></div>
            {[...Array(totalBlocks)].map((v, i) => (
              <Box
                id={i}
                sx={{
                  width: "calc(100% / 1000)",
                  height: 5,
                  background: "orange",
                  display: "inline-block",
                }}
              ></Box>
            ))}

            <Xarrow
              start="parent"
              end="7"
              path="smooth"
              curveness={0.5}
              headSize={3}
            />
            <Xarrow
              start="parent"
              end="700"
              path="smooth"
              curveness={0.5}
              headSize={3}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InputsOutputs;
