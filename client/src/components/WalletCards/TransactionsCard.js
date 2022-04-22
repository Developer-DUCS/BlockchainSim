import { useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import { Icon } from "@iconify/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const styles = {
  "&:hover": {
    color: "blue",
  },
};
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  borderRadius: "16px",
}));

const TransactionCard = (props) => {
  const { sx } = props;
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

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
                <Grid item></Grid>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      backgroundColor: theme.palette.warning.dark,
                      color: theme.palette.secondary[200],
                      // zIndex: 1,
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
                      mt: -4,
                      mb: 0.75,
                    }}
                  >
                    Recent Transactions
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
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      color: "#c7c7c7",
                      fontSize: "1.5rem",
                      fontWeight: 100,
                      mr: 1,
                      mt: 0,
                      mb: 0.75,
                    }}
                  >
                    36
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 0 }}>
                  <Icon
                    icon="mdi:bitcoin"
                    width="30"
                    height="30"
                    mt="10"
                    color="#c7c7c7"
                  />
                </Grid>
                <Grid>
                  <Typography sx={{ ml: 1, color: "#c7c7c7" }}>
                    t5qcwgfkqh
                    <ArrowForwardIcon sx={{ ml: 1, mt: -2.5, mr: 1 }} />
                    f3v80882q9
                  </Typography>
                </Grid>
              </Grid>
              <Grid>
                <Typography
                  color="#919191"
                  sx={{ cursor: "pointer", mt: 0, ml: 21, mb: -1 }}
                  style={styles}
                >
                  View More
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TransactionCard;
