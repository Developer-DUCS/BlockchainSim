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
            <GridItem md={8} align="left">
              <h1 className={classes.title}>Mining</h1>
              <h3 className={classes.description}>
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
                this is called the halving interval.
              </h3>
              <h3 className={classes.description}>
                Mining generally works by utilizing the miners hardware in their
                computer, usually a GPU or CPU, so solve a complex mathematical
                problem. If a miner successfully solves this problem, they
                collect a reward in the form of new bitcoin and/or transaction
                fees. The reward can only be collected if the miner has properly
                validated all of the transactions, satisfying the consensus
                rules. This better enforces the blockchain security. This
                basically means that a miner cannot fabricate a block. Everytime
                a block is “solved” the process resets for all other miners.
                Over time the difficulty of the problem increases. Currently it
                takes around 10 minutes for a block to be mined.
              </h3>
              <h3 className={classes.description}>
                {" "}
                Many miners utilizes multiple machines in order to make mining
                farms. These are large scale operations that mine cryptocurrency
                at a high rate. The downside to any operation is the electricity
                costs, which exponentially increases with a mining farm. While
                the costs to get started and to maintain are high, if the costs
                of the crypto is high enough, these farmers will usually make
                back much more than they spend.
              </h3>
              <h2 className={classes.title}>Types of Consensus Mechanisms</h2>
              <h3 className={classes.description}>
                Users or nodes on Bitcoin’s peer-to-peer network have the option
                of becoming mining nodes. Miners validate incoming transactions
                by including them in candidate blocks. Miners compete with one
                another to add their candidate block to the chain in a process
                known as Proof-of-Work. This refers to computational work done
                by the miner’s hardware to solve cryptography puzzles. In which,
                miner’s compete to find a cryptographic hash that will satisfy
                that block’s difficulty. This means computing cryptographic hash
                functions as fast as possible. When a miner finds this
                goldenhash, they broadcast their block to the rest of the
                network for approval. Proposed blocks must meet the consensus
                rules or be rejected by the rest of the network. Miner’s receive
                the block reward in the form of freshly minted coin subsidy and
                transaction fees from validated transactions. The subsidy for
                mining new blocks started at 50 Bitcoin and has since been cut
                in half every 210,000 blocks or about every four years.
              </h3>
              <h3 className={classes.description}>
                Bitcoin and the Proof-of-Work mechanism uses computational power
                as a scarce resource. This means the higher a miner’s
                computational power the faster they are able to compute hash
                functions and the higher their chances of mining Bitcoin.
                Bitcoin mining originally took place on a computer’s CPU or GPU,
                but nowadays the network is much larger and the hashrate per
                second is much higher. Now miners must use specialized mining
                equipment (ASICs) in large amounts to mine Bitcoin effectively.
                This has led to growing concerns over Bitcoin’s high energy
                consumption.
              </h3>
              <h3 className={classes.description}>
                Proof-of-Stake is another consensus mechanism that was
                introduced by the cryptocurrency Peercoin. It was designed to be
                a sustainable replacement for PoW. Instead of relying on
                computational power, miners stake their assets to participate in
                validation and earn block rewards. The mechanism is
                fundamentally the same as PoW, except the number of hashes
                minters are allowed is proportional to the coinage of their
                stake. That way energy is not wasted computing more hashes than
                necessary and the block difficulty stays very low. This protocol
                uses a little bit of Game Theory to align the interests of the
                users with that of the developers. User’s are incentivized to
                secure the blockchain to protect their staked assets, and they
                receive dividends in the form of block rewards. There are
                drawbacks to this consensus mechanism as well, but that is a
                separate topic.
              </h3>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};
export default TutorialMining;
