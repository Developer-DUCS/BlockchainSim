import React from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Icon } from "@iconify/react";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

// used for styling the card
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  position: "relative",
  borderRadius: "16px",
}));

// stlying the hover over the "..." button
const MyToolTipStyle = styled(({ className, ...props }) => (
  <Tooltip arrow placement="top" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    fontSize: 15,
  },
}));

const TotalBalanceCard = (props) => {
  const { sx, balance } = props;
  const theme = useTheme();

  // allows for toggling between usd and btc
  // the state for usd
  const [usd, setUsd] = React.useState(false);

  // the state for btc
  const [btc, setBtc] = React.useState(true);

  // the total balance in usd after making the conversion from btc
  const [usdBalance, setusdBalance] = React.useState(0);

  // pulls current price of bitcoin and converts values
  React.useEffect(() => {
    // getting the current price of bitcoin by scraping google finance page
    let url =
      "https://web.scraper.workers.dev/?url=https%3A%2F%2Fwww.google.com%2Ffinance%2Fquote%2FBTC-USD%3Fsa%3DX%26ved%3D2ahUKEwj65fnJ9If2AhWlkIkEHReYCTUQ-fUHegQIFRAS&selector=div.YMlKec.fxKbKc&scrape=text&pretty=true";
    let options = {
      method: "GET",
    };

    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("error");
        }
      })
      .then((res) => {
        res = res.result["div.YMlKec.fxKbKc"][0];
        let bitcoinPrice = parseFloat(
          parseInt(res.replace(",", "")) +
            parseInt("0." + res.substring(res.indexOf(".")))
        );
        //1 BTC = ~$43,9000
        //1/43,000 BTC = $1
        //balance is originally set in BTC
        setusdBalance(balance * bitcoinPrice);
      });
  }, [balance]);

  const toggleCurrency = (event) => {
    //if they are currently viewing BTC
    //and want to see it in USD
    if (btc) {
      setUsd(true);
      setBtc(false);
    } else {
      setBtc(true);
      setUsd(false);
    }
  };

  return (
    <>
      <CardWrapper border={false} content={false} sx={sx}>
        <Box sx={{ p: 2.25, height: 190 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.50rem",
                      fontWeight: 500,
                      mr: 2,
                      mb: 0.75,
                    }}
                  >
                    Total Balance
                  </Typography>
                </Grid>
                <Grid item>
                  <MyToolTipStyle
                    disableFocusListener
                    disableTouchListener
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          <b>
                            <em>Curious about how we got these numbers?</em>
                          </b>
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    {/* Will redirect a user to the google finance page, where the conversions are taken from */}
                    <Avatar
                      onClick={() =>
                        window.open(
                          "https://www.google.com/finance/quote/BTC-USD?sa=X&ved=2ahUKEwiI66LIoqH3AhV5kGoFHdwUBv4Q-fUHegQIAhAX",
                          "_blank"
                        )
                      }
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        backgroundColor: theme.palette.secondary.dark,
                        color: theme.palette.secondary[200],
                        zIndex: 1,
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                    >
                      <MoreHorizIcon fontSize="inherit" />
                    </Avatar>
                  </MyToolTipStyle>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {/* Contains the row with a logo and a balance
                  If the balance is in usd => display "$" logo and current balance in usd
                  Else => display btc logo and current balance in btc */}
              {usd ? (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Button color="inherit" onClick={toggleCurrency}>
                      <Avatar
                        sx={{
                          cursor: "pointer",
                          backgroundColor: "white",
                          color: theme.palette.secondary.main,
                        }}
                      >
                        <AttachMoneyIcon fontSize="inherit" />
                      </Avatar>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.0,
                        mb: 0.75,
                      }}
                    >
                      {usdBalance.toFixed(5)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ mt: 2, fontWeight: 500 }}>USD</Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Button color="inherit" onClick={toggleCurrency}>
                      <Icon icon="mdi:bitcoin" width="50" height="50" />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.0,
                        mb: 0.75,
                      }}
                    >
                      {balance.toFixed(5)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ mt: 2, fontWeight: 500 }}>BTC</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TotalBalanceCard;
