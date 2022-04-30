import { Container, Typography } from "@mui/material";
import React from "react";
import TutorialBar from "../reusable/TutorialBar";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../HomePageComponents/Sections/productStyle";
import GridContainer from "../HomePageComponents/GridContainer";
import GridItem from "../HomePageComponents/GridItem";
import classNames from "classnames";
import { container } from "../HomePageComponents/extra_components/material-kit-react";
import Block from "../../assets/Block.jpg";

const useStyles = makeStyles(styles);

const TutorialBlockHeader = (props) => {
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
              <h1 className={classes.title}>Block Header</h1>
              <h3 className={classes.description}>
                The structure of a block is made up of many different
                components. Many will be contained in other tutorials. This
                tutorial is all about the block header, one of the central
                components of a block. The block header is made up of three sets
                of different “block metadata.” The first set of data is the
                reference to the hash of the previous block, this is what allows
                blocks to be connected together in the “chain.” The next set is
                the metadata containing the information about the mining
                competition. There are 3 primary components to this, the
                difficulty, the timestamp, and the nonce. Lastly, the block
                header contains the merkle tree root.
              </h3>
              <h2 className={classes.title}>Block Hash</h2>
              <h3 className={classes.description}>
                The hash of the previous block is an extremely important part of
                the header as it links itself to the block that came before it.
                Using these hashes, it is possible to traverse back to the
                genesis block, which is the very first block in the chain. The
                hash is a 32-bit number that is unique to each block. This can
                be seen when creating a simulation as below:
              </h3>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                  <img src={Block} width="100%" />
                </GridItem>
              </GridContainer>
              <h2 className={classes.title}>
                Difficulty, Timestamp, and Nonce
              </h2>
              <h3 className={classes.description}>
                The second metadata set contains the difficulty, timestamp, and
                the nonce. The difficulty is what the miners use for proof of
                work. You can find more on this in the mining tutorial. The
                timestamp is simply when the block was mined. The nonce however
                is directly related to the difficulty. The nonce is a number
                that can only be used once and is used by the minder to solve
                the difficulty hash. The nonce is the number that is hashed in
                order to match the difficulty. Once the nonce is found, the
                difficulty hash is reset for future blocks and the nonce used to
                solve the block will never be used again.
              </h3>
              <h2 className={classes.title}>Merkle Tree</h2>
              <h3 className={classes.description}>
                The merkle tree may be the most complicated part of the block
                header. It is a summary of all of the transactions that is
                stored in the block. The merkle root is specifically what is
                contained in the header and basically points to the merkle tree.
                Merkle trees at their core are binary trees containing
                cryptographic hashes that identify the transactions. The merkle
                root that is seen in the header is the root of the entire tree.
                The merkle tree is not available for viewing in the simulator,
                mostly due to the amount of transactions in the created blocks
                being low. Merkle trees become very useful in blocks that have
                hundreds or thousands of transactions.
              </h3>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};
export default TutorialBlockHeader;
