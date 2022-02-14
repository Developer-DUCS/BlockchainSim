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
      {/* This is the header where login and other aspects are kept. */}
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Beyond the Block"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "#388697",
        }}
        {...rest}
      />
      {/* {"Basically the background of the top part of page"} */}
      <Parallax filter image={require("../assets/nightSky.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Beyond the Block</h1>
              <h4></h4>
              <br />
              {/* {"Tutorial Button"} */}
              <Button
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
        {/* {"The about our product sectiona and about our team sections."} */}
        <ProductSection />
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
