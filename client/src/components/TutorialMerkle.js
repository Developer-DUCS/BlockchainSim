import { Container, Typography } from "@mui/material";
import React from "react";
import UserBar from "./reusable/UserBar";

const TutorialMerkle = () => {
  const { setTheme } = props;
  return (
    <Auth setUser={setUser}>
      <UserBar
        barTitle={"Simulations"}
        tabNames={["My Simulations", "Shared With Me"]}
        setSelectedTab={(e, newValue) => setSelectedTab(newValue)}
        selectedTab={selectedTab}
        setTheme={setTheme}
      />
      <Container>
        <Typography variant="h3" align="center">
          Tutorial for Merkle Tree
        </Typography>
        <Typography variant="h4">Graph</Typography>
        <Typography variant="body1">Explaination</Typography>
      </Container>
    </Auth>
  );
};
export default TutorialMerkle;
