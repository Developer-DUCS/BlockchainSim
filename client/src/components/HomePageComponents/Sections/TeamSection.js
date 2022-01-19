import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../GridContainer.js";
import GridItem from "../GridItem.js";
import Button from "../Button.js";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";

import styles from "./teamStyle.js";

//Need Pictures of Dev Team

import Laura from "../../../assets/Laura.png";
import Ean from "../../../assets/Ean.jpg";
import Bryan from "../../../assets/Bryan.png";
import Dawson from "../../../assets/Dawson.jpg";
import Sean from "../../../assets/Sean.jpg";
import Seth from "../../../assets/Seth.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={Laura} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Laura Prieto
                <br />
                <small className={classes.smallTitle}>
                  Researcher and Back End Developer
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Research member on the team. Wants to get into CERN or grad
                  school for Computer Science. Loves outdoors and hiking.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={Ean} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Ean Vandergraaf
                <br />
                <small className={classes.smallTitle}>
                  Full Stack Developer
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  On BtB, I have worked on front end development and design, as
                  well as research. I am a Software Engineering major with a
                  minor in Cyber-Risk management. I am also apart of the Men's
                  Swim team and Cyber Defense Club at Drury
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={Bryan} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Bryan Valencia
                <br />
                <small className={classes.smallTitle}>
                  Database and Back End Developer
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  After graduation, I plan to secure a remote position, so I can
                  travel while I work. My favorite hobbies include playing
                  League of Legends, kayaking, and learning new languages on
                  Duolingo. On BTB, I have mainly worked on the backend
                  (database and deployment). I've dabbled with front-end
                  development, and I'm working on randomly generating
                  transactions for our blocks.{" "}
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={Dawson} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Dawson Holderman
                <br />
                <small className={classes.smallTitle}>
                  Product Owner and Full Stack Developer
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  I hope to work remotely after I graduate this Spring. I love
                  playing Counter-Strike and making gaming Youtube videos. I
                  have worked as the product owner for this project as well as
                  working with Front-end and Back-end development
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={Seth} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Seth Workman
                <br />
                <small className={classes.smallTitle}>
                  Technology Lead and Front End Developer
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  I want to get a job and start working as a software developer
                  after graduation. Favorite video game to play currently is New
                  World. I primarily work on front end and any other fixes
                  needed for the project.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={Sean} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Sean Lowery
                <br />
                <small className={classes.smallTitle}>
                  Researcher and Back End Developer
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  I'm currently looking for jobs after graduation. I would also
                  prefer something remote so that I can travel while working. I
                  like playing guitar, reading, writing, and yoga. I chose to do
                  my senior honors project on blockchain and consensus
                  mechanisms, and that has helped me with some of the research
                  and back-end development on this project.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
