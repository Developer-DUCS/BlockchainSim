import { Container, Typography } from "@mui/material";
import React from "react";
import TutorialBar from "../reusable/TutorialBar";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../HomePageComponents/Sections/productStyle";
import GridContainer from "../HomePageComponents/GridContainer";
import GridItem from "../HomePageComponents/GridItem";
import Grid from "@mui/material/Grid";
import classNames from "classnames";
import { container } from "../HomePageComponents/extra_components/material-kit-react";
import WalletTab from "../../assets/WalletTab.png";
import WalletMinerDropDown from "../../assets/WalletMinerDropDown.png";
import MinerSelect from "../../assets/MinerSelect.png";
import WalletImage from "../../assets/WalletImage.png";
import AddWalletImage from "../../assets/AddWalletImage.png";

const useStyles = makeStyles(styles);

const TutorialWallets = (props) => {
  const { setTheme } = props;
  const classes = useStyles();

  return (
    <div>
      <TutorialBar barTitle={`Tutorial`} setTheme={setTheme} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}></div>
        <div className={classes.section}>
          <Grid>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h1 className={classes.title}>Wallets</h1>
                <h3 className={classes.description}>
                  Wallets are an important part of the blockchain, because they
                  introduce users to the equation. A wallet allows a user to
                  send and recieve bitcoin, track transactions, and manage
                  private keys. Wallets do not contain any actual coin, but
                  instead contain the private keys necessary to create a
                  transaction.
                </h3>

                <h2 className={classes.title}>Wallets in a Simulation</h2>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={6} sm={6} md={4}>
                <h3 className={classes.description}>
                  Since wallets are an important part of the blockchain, they
                  are included in the simulation. Each simulation contains
                  wallets for every miner. To view the wallets click on the
                  wallet tab from the simulation page.
                </h3>
              </GridItem>
              <GridItem container xs={5} sm={5} md={3}>
                <img src={WalletTab} width="100%" />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h1 className={classes.title}>Viewing a Wallet</h1>
                <h3 className={classes.description}>
                  In order to view the wallet for a certain miner, click on the
                  miner drop down and select a miner. Once a miner is selected
                  all balances, transactions, and addresses will be displayed.
                </h3>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={6} sm={6} md={4}>
                <img src={WalletMinerDropDown} alt="..." width="100%" />
              </GridItem>
              <GridItem xs={6} sm={6} md={4}>
                <img src={MinerSelect} alt="..." width="100%" />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h1 className={classes.title}>About our Wallets</h1>
                <h3 className={classes.description}>
                  Included in a wallet is the balance, available addresses, a
                  ledger, and the ability to send and recieve coin. 'Total
                  Balance' is the amount of coin that is currently owned by a
                  single miner. 'Addresses Available' represents all addresses
                  of transactions that the miner has dealt with. 'Ledger' is the
                  personal ledger for the miner representing every transaction
                  involving that miner. The first number represents which block
                  the transaction was in. *Clicking the bitcoin logo will
                  convert the balance to USD
                </h3>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={9} sm={9} md={5}>
                <img src={WalletImage} width="100%" />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h1 className={classes.title}>Viewing multiple Wallets</h1>
                <h3 className={classes.description}>
                  To view and compare multiple wallets at once, just click 'Add
                  Wallet'.
                </h3>
                <img src={AddWalletImage} width="100%" />
              </GridItem>
            </GridContainer>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default TutorialWallets;
