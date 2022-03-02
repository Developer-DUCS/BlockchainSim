import PropTypes from "prop-types";
import React, { useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import EarningIcon from "../../images/icons/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Icon } from "@iconify/react";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  // overflow: "hidden",
  position: "relative",
  borderRadius: "16px",
}));

const TotalBalanceCard = (props) => {
  const [bitcoinPrice, setBitcoinPrice] = React.useState();
  React.useEffect(() => {
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
        res = res.result;
        setBitcoinPrice(res["div.YMlKec.fxKbKc"][0]);
      });
  });
  const { sx, balance } = props;
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currency, setCurrency] = React.useState("USD");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setUSD = () => {
    setAnchorEl(null);
    // setCurrency("USD");
    //going from BTC to USD
    balance = balance / bitcoinPrice;
  };

  return (
    <>
      <CardWrapper border={false} content={false} sx={sx}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.primary[800],
                      mt: 1,
                    }}
                  >
                    <img src={EarningIcon} alt="Notification" />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Avatar
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
                    onClick={handleClick}
                  >
                    <MoreHorizIcon fontSize="inherit" />
                  </Avatar>
                  <Menu
                    id="menu-earning-card"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={setUSD}>
                      <AttachMoneyIcon /> View in USD
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Icon
                        icon="mdi:bitcoin"
                        width="27.5"
                        height="27.5"
                        color="theme.palette.secondary.dark"
                      />{" "}
                      View in BTC
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "2.125rem",
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
                      mb: 0.75,
                    }}
                  >
                    ${balance.toFixed(5)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      ...theme.typography.smallAvatar,
                      backgroundColor: theme.palette.secondary[200],
                      color: theme.palette.secondary.dark,
                    }}
                  >
                    <AttachMoneyIcon fontSize="inherit" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: theme.palette.secondary[200],
                }}
              >
                Total Balance
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TotalBalanceCard;
