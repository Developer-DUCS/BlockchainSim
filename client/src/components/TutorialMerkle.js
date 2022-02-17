import { Container, Typography } from "@mui/material";
import React from "react";
import Auth from "./reusable/Auth";

const TutorialMerkle = () => {
  return (
    <Auth>
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
