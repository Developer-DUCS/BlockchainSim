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
              <h1 className={classes.title}>Blockchain</h1>
              <h3 className={classes.description}>
                Bitcoin was launched in 2009 as an ‘electronic peer-to-peer cash
                system’. The anonymous user Satoshi Nakamoto combined multiple
                existing technologies in new ways to create the Bitcoin network
                that we know today. A blockchain is distributed across the
                network and functions as a public ledger for all transactions.
                The key features of the Bitcoin network are that it is
                decentralized and permissionless. This is what separates Bitcoin
                from other digital assets, such as online banking.
              </h3>
              <h3 className={classes.description}>
                Permissionless means you do not need permission to participate
                in the Bitcoin network; any user can download the blockchain and
                run a full node. Decentralized means that there is no central
                authority governing Bitcoin. This is desirable for its own
                reasons, and it serves as a guiding principle for the entire
                system. However, being decentralized makes the blockchain
                network cumbersome and sometimes unpredictable, but the result
                is a system that can’t be manipulated by any single party. The
                possibility of an attack or fork is there, but since Bitcoin’s
                launch in 2009 there have been no major security issues. Blocks
                cannot be altered once they are on the chain, and blocks must be
                validated and accepted by the majority of the network before
                they can be added. This is the original Satoshi protocol – a set
                of rules that the blockchain network must follow. Satoshi’s
                protocol is called different things depending on what function
                you are referring to. It also goes by consensus mechanism
                because it is responsible for keeping the network in full
                agreement on the current state of the blockchain. It is most
                commonly known as Proof-of-Work, referring to mining, or the
                process of creating a new block and earning the right to add it
                to the chain. All cryptocurrencies that came later use some
                variation of Satoshi’s protocol.{" "}
              </h3>
              <h3 className={classes.description}>
                After the launch of Bitcoin, Satoshi worked with a team of
                volunteers to develop the first wallets. Before wallets, users
                had to keep a physical or digital copy of their private key to
                access and spend their Bitcoin. If they lost this private key
                they lost their Bitcoin for good. This is another side effect of
                decentralization. Here we will describe the various parts of the
                blockchain, what goes in an actual block, how the network
                communicates, and much more. On this website you can also create
                and explore your own blockchain simulations if you prefer a
                hands-on learning experience.
              </h3>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};
export default TutorialHome;
