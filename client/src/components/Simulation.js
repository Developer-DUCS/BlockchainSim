import React from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import BlockComponent from "./BlockComponent";
import UserBar from "./UserBar";
import Auth from "./Auth";
import { useParams } from "react-router-dom";
import TabPanel from "./TabPanel";

const Simulation = () => {
  // Used for UserBar component to keep track of selected tab - Set Default to default tab index
  const [selectedTab, setSelectedTab] = React.useState(0);

  let { id } = useParams();

  // Test Date for blocks
  const demoBlock = {
    blockNumber: "14",
    blockDate: "28/09/21 06:04:11",
    blockMiner: "lsgh0325",
    blockMerkleTree:
      "0000180d78f908b719c223bcc1aaac0b668ad40ab63891d6c19900228728440",
    blockTransactions: [
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "6.25",
        transactionNameFrom: "New",
        transactionNameTo: "hjy764",
        transactionAddressFrom: "Block Reward",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "ipp098",
        transactionNameTo: "New",
        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
      {
        transactionHash: "12938198dhf8h",
        transactionAmount: "1",
        transactionNameFrom: "Seth",
        transactionNameTo: "Ean",
        transactionAddressFrom: "eb38e60ac0",
        transactionAddressTo: "eb38e60ac0",
      },
    ],
    blockPreviousHash: "000000f575cf1e27b85c8ad98a98djf9au9h9ajsdofj",
    blockNonce: "23529",
    blockHash:
      "000099d89ffda35707d4ffa5ae51667d4c179e0ebd7b4799b85e11675633f7dc",
  };

  return (
    <Auth>
      <UserBar
        barTitle={`Simulation ${id}`}
        tabNames={["Main Chain", "Wallet"]}
        setSelectedTab={(e, newValue) => setSelectedTab(newValue)}
        selectedTab={selectedTab}
      />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button color="primary" variant="contained">
            Options
          </Button>
        </Box>
        <TabPanel value={selectedTab} index={0}>
          <Box sx={{ mt: 2 }}>
            <Button color="secondary" variant="contained" sx={{ mr: 2 }}>
              Add New Block
            </Button>
            <TextField
              size="small"
              label="Search"
              variant="outlined"
              type="search"
            />
          </Box>
          <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent block={demoBlock} />
            </Box>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent block={demoBlock} />
            </Box>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent block={demoBlock} />
            </Box>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              <BlockComponent block={demoBlock} />
            </Box>
          </div>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          Wallet
        </TabPanel>
      </Container>
    </Auth>
  );
};

export default Simulation;
