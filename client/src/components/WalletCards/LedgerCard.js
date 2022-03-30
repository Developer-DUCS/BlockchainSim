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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Icon } from "@iconify/react";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: "#fff",
  // overflow: "hidden",
  position: "relative",
  borderRadius: "16px",
}));

const LedgerCard = (props) => {
  const { sx, wallets } = props;

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  // Want to get the personal ledger for a certain miner
  // Need to create API route

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
                      backgroundColor: theme.palette.warning.dark,
                      color: theme.palette.warning[200],
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
                    <MenuItem onClick={handleClose}>
                      <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> View Balance
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.50rem",
                      fontWeight: 500,
                      mr: 1,
                      ml: 6,
                      mt: -4,
                      mb: 0.75,
                    }}
                  >
                    Ledger
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      mr: 1,
                      mt: 0.5,
                      mb: 0.75,
                    }}
                  >
                    100
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 0.5 }}>
                  <Icon
                    icon="mdi:bitcoin"
                    width="30"
                    height="30"
                    mt="10"
                    color="theme.palette.secondary.dark"
                  />
                </Grid>
                <Grid>
                  <Typography sx={{ ml: 1 }}>
                    BLOCKCHAIN
                    <ArrowForwardIcon sx={{ ml: 1, mt: -0.5, mr: 1 }} />
                    ean@drury.edu
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default LedgerCard;
