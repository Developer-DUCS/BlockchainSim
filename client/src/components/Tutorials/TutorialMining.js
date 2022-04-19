import { Container, Typography } from "@mui/material";
import React from "react";
import TutorialBar from "../reusable/TutorialBar";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../HomePageComponents/Sections/productStyle";
import GridContainer from "../HomePageComponents/GridContainer";
import GridItem from "../HomePageComponents/GridItem";
import classNames from "classnames";
import { container } from "../HomePageComponents/extra_components/material-kit-react";

const useStyles = makeStyles(styles);

const TutorialMining = (props) => {
  const { setTheme } = props;
  const classes = useStyles();

  const [user, setUser] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <div>
      <TutorialBar barTitle={`Tutorial`} setTheme={setTheme} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}></div>
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Mining</h1>
              <h5 className={classes.description}>
                Mining is used to include transactions in blocks. In Bitcoin,
                mining is based on computation. Transactions are grouped
                together into blocks, which requires a large amount of
                computation power to prove, but less to verify that they are
                proven. Mining allows for high-level security using consensus
                rules. This lets the blockchain reject any invalid or tampered
                transactions. It is mining that actually creates new bitcoin in
                each block. The amount of bitcoin created per block lessens and
                lessens over time. When creating a simulation, you can choose
                the amount of time it takes for the amount of bitcoin to lessen,
                this is called the halving interval. Mining generally works by
                utilizing the miners hardware in their computer, usually a GPU
                or CPU, so solve a complex mathematical problem. If a miner
                successfully solves this problem, they collect a reward in the
                form of new bitcoin and/or transaction fees. The reward can only
                be collected if the miner has properly validated all of the
                transactions, satisfying the consensus rules. This better
                enforces the blockchain security. This basically means that a
                miner cannot fabricate a block. Everytime a block is “solved”
                the process resets for all other miners. Over time the
                difficulty of the problem increases. Currently it takes around
                10 minutes for a block to be mined. Many miners utilizes
                multiple machines in order to make mining farms. These are large
                scale operations that mine cryptocurrency at a high rate. The
                downside to any operation is the electricity costs, which
                exponentially increases with a mining farm. While the costs to
                get started and to maintain are high, if the costs of the crypto
                is high enough, these farmers will usually make back much more
                than they spend.
              </h5>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};
export default TutorialMining;
