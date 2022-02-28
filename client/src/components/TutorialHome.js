import { Container, Typography } from "@mui/material";
import React from "react";
import UserBar from "./reusable/UserBar";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./HomePageComponents/Sections/productStyle";
import GridContainer from "./HomePageComponents/GridContainer";
import GridItem from "./HomePageComponents/GridItem";
import classNames from "classnames";
import { container } from "./HomePageComponents/extra_components/material-kit-react";

const useStyles = makeStyles(styles);

const TutorialHome = (props) => {
  const { setTheme } = props;
  const classes = useStyles();

  const [user, setUser] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <div>
      <UserBar barTitle={`Tutorial`} setTheme={setTheme} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}></div>
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Merkle Trees</h2>
              <h5 className={classes.description}>Merkle Tree Description</h5>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};
export default TutorialHome;
