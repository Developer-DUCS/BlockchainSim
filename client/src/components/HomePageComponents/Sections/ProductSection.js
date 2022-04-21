import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AccountTree from "@material-ui/icons/AccountTree";
import Share from "@material-ui/icons/Share";
import AccountBox from "@material-ui/icons/AccountBox";
// core components
import GridContainer from "../GridContainer.js";
import GridItem from "../GridItem.js";
import InfoArea from "../InfoArea.js";

import styles from "./productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
            Beyond the Block consists of a web page that simulates how
            blockchain works. It allows a user to explore the process of block
            chain. At the same time, the simulator can be extended to different
            block chain technologies. The user can interact with the simulator,
            changing variables to further understand how blockchain works and
            how transactions are made.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Create Simulations"
              description="Create detailed blockchain simulations. Able to see many different aspects and behind the scenes of what happens in blockchain technology."
              icon={AccountTree}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Make an Account"
              description="Want to save your simulations? Make an account for free and access your simulations wherever you are!"
              icon={AccountBox}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Share Your Projects"
              description="Needing to teach, share a simulation with colleagues, or work together with a friend? You can share your simulations with whom ever you wish! They only need their own account!"
              icon={Share}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
