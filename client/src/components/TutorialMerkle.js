import { Container, Typography } from "@mui/material";
import React from "react";
import UserBar from "./reusable/UserBar";
import Auth from "./reusable/Auth";

const TutorialMerkle = (props) => {
  const { setTheme } = props;

  const [user, setUser] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);
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
