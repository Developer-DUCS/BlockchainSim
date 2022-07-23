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
import AddrStep1 from "../../assets/addr-step1.png";
import AddrStep2 from "../../assets/addr-step2.png";
import ECM from "../../assets/ecm.png";

const useStyles = makeStyles(styles);

const TutorialAddresses = (props) => {
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
              <GridItem md={8} align="left">
                <h1 className={classes.title}>Addresses</h1>
                <h3 className={classes.description}>
                  Addresses and digital signatures are created through Public
                  and Private Key technology and is how users are able to prove
                  their identity and verify the identity of others.
                </h3>
                <h2 className={classes.title}>Private Public Key</h2>
                <h3 className={classes.description}>
                  Private and Public Key technology is an integral part of the
                  Bitcoin network, and has been around since the 1970’s. In
                  essence, how private and public keys work is that you can
                  encrypt a message with your private key, and anybody is able
                  to use your public key to decrypt that message. As the name
                  would suggest, the Public Key can be given to anyone, but the
                  Private Key must be kept secret. A private key in the Bitcoin
                  network is a number between 2^0 and 2^256 and can be
                  represented in 64 hexadecimal characters. The Public key is
                  generated through elliptic curve multiplication, which you can
                  learn more about in{" "}
                  <a
                    href={
                      "https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch04.asciidoc"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mastering Bitcoin
                  </a>
                  .
                </h3>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem md={8} align="left">
                <img
                  src={ECM}
                  alt="Elliptic curve multiplication graph."
                  width="100%"
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem md={8} align="left">
                <h3 className={classes.description}>
                  A digital signature can be created by hashing a transaction
                  and encrypting it with your private key. Now, anyone can hash
                  the transaction on their own, decrypt the encrypted hash with
                  your public key, and verify that you are the person who signed
                  the document. To learn more about digital signatures, watch
                  this{" "}
                  <a
                    href={"https://www.youtube.com/watch?v=s22eJ1eVLTU"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    computerphile video
                  </a>
                  .
                </h3>
                <h2 className={classes.title}>Creating Addresses</h2>
                <h3 className={classes.description}>
                  Addresses allow you to send money to specific people in the
                  Bitcoin network. You can have multiple Bitcoin addresses as
                  it's a product of a public key. To generate an address you
                  must take your public key, apply the SHA-256 hash, and
                  subsequently apply the RIPEMD160 hash to the result.
                </h3>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem md={8} align="left">
                <img
                  src={AddrStep1}
                  alt="Step 1 of the Bitcoin address generation."
                  width="100%"
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem md={8} align="left">
                <h3 className={classes.description}>
                  Once you have the public key hash, you must prefix a certain
                  version number depending on the type of address you want to
                  generate. For Bitcoin addresses you prepend 0x00, for
                  Pay-to-Script-Hash addresses you prepend 0x05. Since we want a
                  Bitcoin address we prepend 00 in hex to our hash and apply
                  SHA-256 on it twice. We take the first four bytes and append
                  it to our original hash. With the four bytes appended to our
                  original hash, we can change the encoding from Base16 to
                  Base58. Bitcoin addresses will always begin with 1.
                </h3>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem md={8} align="left">
                <img
                  src={AddrStep2}
                  alt="Step 2 of the Bitcoin address generation."
                  width="100%"
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem md={8} align="left">
                <h2>Sources</h2>
                <h3 className={classes.description}>
                  <a
                    href={
                      "https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch04.asciidoc"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mastering Bitcoin
                  </a>
                </h3>
              </GridItem>
            </GridContainer>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default TutorialAddresses;
