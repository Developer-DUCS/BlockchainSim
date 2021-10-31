import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "./HomePageComponents/Header";
import Footer from "./HomePageComponents/Footer";
import GridContainer from "./HomePageComponents/GridContainer";
import GridItem from "./HomePageComponents/GridItem";
import Button from "./HomePageComponents/Button";
import HeaderLinks from "./HomePageComponents/HeaderLinks";
import Parallax from "./HomePageComponents/Parallax.js";

import styles from "./HomePageComponents/HomePage.js";
//sections for the page
import ProductSection from "./HomePageComponents/Sections/ProductSection";
import TeamSection from "./HomePageComponents/Sections/TeamSection.js";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const HomePage = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Beyond the Block"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("../assets/not_Rick_Astley.png").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>About Us</h1>
              <h4>
                Beyond the Block consists of a web page that simulates how
                blockchain works. It allows a user to explore the process of
                block chain. At the same time, the simulator can be extended to
                different block chain technologies. The user can interact with
                the simulator, changing variables to further understand how
                blockchain works and how transactions are made.
              </h4>
              <br />
              <Button
                color="primary"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Tutorial
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}></div>
        <ProductSection />
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
