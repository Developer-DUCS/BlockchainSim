import { Container, Typography } from "@mui/material";
import React from "react";
import UserBar from "./reusable/UserBar";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./HomePageComponents/Sections/productStyle";

const useStyles = makeStyles(styles);

const TutorialMerkle = (props) => {
  const { setTheme } = props;
  const classes = useStyles();

  const [user, setUser] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      <UserBar barTitle={`Tutorial`} setTheme={setTheme} />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Merkle Trees</h2>
          <h5 className={classes.description}>Merkle Tree Description</h5>
        </GridItem>
      </GridContainer>
    </div>
  );
};
export default TutorialMerkle;
