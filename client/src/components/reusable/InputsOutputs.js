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
  Typography,
} from "@mui/material";
import Xarrow from "react-xarrows";

const InputsOutputs = ({ transaction, blockData }) => {
  const [totalBlocks, setTotalBlocks] = React.useState(0);
  const [inputs, setInputs] = React.useState([]);
  const [outputs, setOutputs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showBlocks, setShowBlocks] = React.useState(inputs);
  const [transactions, setTransactions] = React.useState([transaction]);

  React.useEffect(() => {
    if (transactions.length > 0) {
      // Set the total number of blocks
      setTotalBlocks(blockData.length);
      transactions.map((t, i) => {
        if (inputs[i] == undefined) {
          let inputTransactions = t.transaction_data.addresses_input_UTXO;
          let outputTransactions = [
            t.transaction_data.receiver_address,
            t.transaction_data.sender_leftover_address,
          ];

          // call track address here with ur data
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
              setInputs([...inputs, [...inputsOutputs[0]]]);
              setOutputs([...outputs, [...inputsOutputs[1]]]);

              // Sets the loading state to false
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
    }
  }, [transactions]);

  const handleInputsClick = (e, i) => {
    e.preventDefault();
    setShowBlocks(inputs[i]);
    setAnchorEl(e.currentTarget);
  };

  const handleOutputsClick = (e, i) => {
    e.preventDefault();
    setShowBlocks(outputs[i]);
    setAnchorEl(e.currentTarget);
  };

  const handleBlockClick = (e, block) => {
    e.preventDefault();
    popoverClose();
    setTransactions([...transactions, block]);
    setLoading(true);
  };

  const popoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          {transactions.map((tx, i) => (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={2}>
                    <Card
                      id={`-1-${i}`}
                      sx={{
                        width: 100,
                        height: 50,
                        bgcolor: "secondary.main",
                        margin: "0 auto",
                        textAlign: "center",
                        lineHeight: "50px",
                        zIndex: "1",
                        color: "white",
                      }}
                    >
                      Blockchain
                    </Card>
                  </Grid>
                  <Grid item xs={8}>
                    <Avatar
                      id={`parent-${i}`}
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: "primary.main",
                        margin: "0 auto",
                        textAlign: "center",
                        lineHeight: "50px",
                        zIndex: "1",
                        color: "white",
                      }}
                    >
                      {tx.transaction_data.block_height + 1}
                    </Avatar>
                  </Grid>
                  <Grid item xs={2}>
                    <Card
                      id={`-2-${i}`}
                      sx={{
                        width: 100,
                        height: 50,
                        bgcolor: "secondary.main",
                        margin: "0 auto",
                        textAlign: "center",
                        lineHeight: "50px",
                        zIndex: "1",
                        color: "white",
                      }}
                    >
                      UTXO Pool
                    </Card>
                  </Grid>
                </Grid>
                <div style={{ height: 150 }}></div>
                {[...Array(totalBlocks)].map((v, j) => (
                  <Box
                    key={`${j}-${i}`}
                    id={`${j}-${i}`}
                    sx={{
                      width: `calc(100% / ${totalBlocks})`,
                      height: 5,
                      bgcolor: "secondary.main",
                      display: "inline-block",
                    }}
                  ></Box>
                ))}
                <Grid container>
                  <Grid item xs={6} textAlign="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={(e) => handleInputsClick(e, i)}
                      size="small"
                    >
                      Inputs
                    </Button>
                  </Grid>
                  <Grid item xs={6} textAlign="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => handleOutputsClick(e, i)}
                      size="small"
                    >
                      Outputs
                    </Button>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Typography sx={{ mt: 1 }} variant="subtitle2">
                      {tx.hash}
                    </Typography>
                  </Grid>
                </Grid>

                {inputs[i].map((input, j) => (
                  <>
                    <Xarrow
                      key={`${j}-${i}`}
                      start={`${input.transaction_data.block_height + 1}-${i}`}
                      end={`parent-${i}`}
                      path="straight"
                      headSize={3}
                      color="#127E59"
                      startAnchor={{
                        position:
                          input.transaction_data.block_height + 1 == -1
                            ? "right"
                            : "top",
                      }}
                      endAnchor={{ position: "auto" }}
                    />
                  </>
                ))}

                {outputs[i].map((output, j) => (
                  <Xarrow
                    key={`${j}-${i}`}
                    start={`parent-${i}`}
                    end={`${output.transaction_data.block_height + 1}-${i}`}
                    path="straight"
                    headSize={3}
                    color="#BC2C1A"
                    startAnchor={{ position: "auto" }}
                    endAnchor={{
                      position:
                        output.transaction_data.block_height + 1 == -1
                          ? "left"
                          : "top",
                    }}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
          <Grid container>
            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                color="secondary"
                disabled={Boolean(transactions.length <= 1)}
                onClick={(e) => {
                  e.preventDefault();
                  setTransactions(transactions.slice(0, -1));
                  setInputs(inputs.slice(0, -1));
                  setOutputs(outputs.slice(0, -1));
                }}
                size="small"
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
          <Popover
            id={"inputs/outputs"}
            open={open}
            anchorEl={anchorEl}
            onClose={popoverClose}
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
                    disabled={Boolean(
                      block.transaction_data.block_height + 1 == -1 ||
                        block.transaction_data.block_height + 1 == -2
                    )}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={(e) => handleBlockClick(e, block)}
                  >
                    {block.transaction_data.block_height + 1 == -1
                      ? "BlockChain"
                      : null}
                    {block.transaction_data.block_height + 1 == -2
                      ? "UTXO Pool"
                      : null}
                    {block.transaction_data.block_height + 1 != -1 &&
                    block.transaction_data.block_height + 1 != -2
                      ? `${block.transaction_data.block_height + 1}`
                      : null}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Popover>
        </>
      )}
    </>
  );
};

export default InputsOutputs;
