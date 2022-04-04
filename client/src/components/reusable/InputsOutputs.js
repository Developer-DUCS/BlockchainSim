import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Button,
  Popover,
} from "@mui/material";
import Xarrow from "react-xarrows";

const InputsOutputs = ({ transaction, blockData }) => {
  const [totalBlocks, setTotalBlocks] = React.useState(0);
  const [inputs, setInputs] = React.useState([]);
  const [outputs, setOutputs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showBlocks, setShowBlocks] = React.useState(inputs);

  React.useEffect(() => {
    if (!_.isEmpty(transaction)) {
      // Set the total number of blocks
      setTotalBlocks(blockData.length);

      // Input/Output transactions
      let inputTransactions = transaction.transaction_data.addresses_input_UTXO;
      let outputTransactions = [
        transaction.transaction_data.receiver_address,
        transaction.transaction_data.sender_leftover_address,
      ];

      //call track address here with ur data
      /*       let inputsOutputs = trackAddres(
        inputTransactions,
        outputTransactions,
        blockData
      ); */
      let inputsOutputs;

      // Add block API Call
      let url = `http://${process.env.REACT_APP_API_URL}/api/addresses/trackaddress`;
      let getData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: inputTransactions,
          output: outputTransactions,
          blockData: blockData,
        }),
      };

      fetch(url, getData)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("error");
          }
        })
        .then((res) => {
          inputsOutputs = res.inputsOutputs;

          // Set the inputs and outputs for drawing the arrows
          // This should be the block number or blockchain/utxo_pool
          // setInputs(inputsOutputs[0]); // Example - inputs from blockchain and block 45
          // setOutputs(inputsOutputs[1]); // Example - outputs to block 86 and utxo_pool
          setInputs(inputsOutputs[0]);
          setOutputs(inputsOutputs[1]);

          // Sets the loading state to false
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [transaction]);

  const handleInputsClick = (e) => {
    setShowBlocks(inputs);
    setAnchorEl(e.currentTarget);
  };

  const handleOutputsClick = (e) => {
    setShowBlocks(outputs);
    setAnchorEl(e.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <Grid container>
              <Grid item xs={2}>
                <Box
                  id="-1"
                  sx={{
                    width: 100,
                    height: 50,
                    background: "gray",
                    margin: "0 auto",
                    textAlign: "center",
                    lineHeight: "50px",
                    zIndex: "1",
                    color: "white",
                  }}
                >
                  Blockchain
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Avatar
                  id="parent"
                  sx={{
                    width: 50,
                    height: 50,
                    background: "gray",
                    margin: "0 auto",
                    textAlign: "center",
                    lineHeight: "50px",
                    zIndex: "1",
                  }}
                >
                  {transaction.transaction_data.block_height + 1}
                </Avatar>
              </Grid>
              <Grid item xs={2}>
                <Box
                  id="-2"
                  sx={{
                    width: 100,
                    height: 50,
                    background: "gray",
                    margin: "0 auto",
                    textAlign: "center",
                    lineHeight: "50px",
                    zIndex: "1",
                    color: "white",
                  }}
                >
                  UTXO Pool
                </Box>
              </Grid>
            </Grid>
            <div style={{ height: 150 }}></div>
            {[...Array(totalBlocks)].map((v, i) => (
              <Box
                key={i}
                id={i}
                sx={{
                  width: `calc(100% / ${totalBlocks})`,
                  height: 5,
                  background: "gray",
                  display: "inline-block",
                }}
              ></Box>
            ))}
            <Grid container>
              <Grid item xs={6} textAlign="center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleInputsClick}
                >
                  Inputs
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOutputsClick}
                >
                  Outputs
                </Button>
              </Grid>
            </Grid>

            {inputs.map((input, i) => (
              <Xarrow
                key={i}
                start={`${input}`}
                end="parent"
                path="straight"
                headSize={3}
                color="#127E59"
                startAnchor={{
                  position: input == -1 ? "right" : "top",
                }}
                endAnchor={{ position: "auto" }}
              />
            ))}

            {outputs.map((output, i) => (
              <Xarrow
                key={i}
                start="parent"
                end={`${output}`}
                path="straight"
                headSize={3}
                color="#BC2C1A"
                startAnchor={{ position: "auto" }}
                endAnchor={{ position: output == -1 ? "left" : "top" }}
              />
            ))}

            <Popover
              id={"inputs/outputs"}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Grid container>
                {showBlocks.map((block) => (
                  <Grid item sx={{ m: 0.5 }}>
                    <Button
                      disabled={block === -1}
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        console.log("block", block);
                        setAnchorEl(null);
                      }}
                    >
                      {block}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Popover>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InputsOutputs;
