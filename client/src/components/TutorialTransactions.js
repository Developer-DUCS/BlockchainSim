import { Container, Typography } from "@mui/material";
import React from "react";
import TutorialBar from "./reusable/TutorialBar";
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
      <TutorialBar barTitle={`Tutorial`} setTheme={setTheme} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}></div>
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Transactions</h1>
              <h5 className={classes.description}>
                Transactions are the central component of the blockchain. The
                blockchain exists to store transaction information, and all the
                other components simply ensure that this information is
                immutable and consistent among all users.
              </h5>
              <h2 className={classes.title}>Coinbase</h2>
              <h5 className={classes.description}>
                Since transactions must be 100 blocks deep before they are able
                to be spent, the first 100 blocks contain only the ‘coinbase’
                transaction. The coinbase transaction is essentially how money
                is printed into the economy. Miners iterate over a nonce to
                reach a target value, and once they find a nonce that meets this
                target, they are able to insert themselves as the receiver of
                the coinbase reward in the block. The coinbase reward can be
                modified on our simulation with the subsidy parameter found in
                the Create a Simulation page and began at 50 BTC on the Bitcoin
                network. This coinbase reward will be halved after a certain
                number of blocks until no coinbase reward is given to the miner.
                At this point, the blockchain is expected to have a significant
                number of users and should be able to keep propagating with the
                use of fees, which is discussed next.
              </h5>
              <h2 className={classes.title}>Fees</h2>
              <h5 className={classes.description}>
                Each time a user sends money to another user, there is a small
                fee taken out that gets rewarded to the miner of the block that
                contains that transaction. For example, if you have a unspent
                transaction output (UTXO) worth 50 BTC, and you want to send
                another user 40 BTC, you will send 40 BTC to that user, set
                aside a small amount, perhaps .0005 BTC, as a fee, and send
                yourself back the remaining 9.9995 BTC. While .0005 isn’t a
                particularly large amount of bitcoin, with hundreds or thousands
                of these fees, the total fee amount can add up to a substantial
                amount. These fees are usually calculated and included
                automatically by the software you use to send bitcoin, but if
                you include a higher than average fee, your transaction is more
                likely to get included into a block quicker because miners
                prioritize the highest fees available to gain the most reward
                possible. Conversely, if you don’t set aside any money for a
                fee, your transaction is likely to be unsent because miners will
                not be incentivized to include your transaction in their block.
                Again, as the coinbase reward dwindles to 0, fees are the
                driving motivation for users to mine the blockchain.
              </h5>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};
export default TutorialHome;
