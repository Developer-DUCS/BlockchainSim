import { Container, Typography, Divider } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center">
        Homepage
      </Typography>
      <Divider sx={{ m: 5 }} />
      <Typography variant="h4">About</Typography>
      <Typography variant="body1">
        Beyond the Block consists of a web page that simulates how blockchain
        works. It allows a user to explore the process of block chain. At the
        same time, the simulator can be extended to different block chain
        technologies. The user can interact with the simulator, changing
        variables to further understand how blockchain works and how
        transactions are made.
      </Typography>
    </Container>
  );
};

export default HomePage;
