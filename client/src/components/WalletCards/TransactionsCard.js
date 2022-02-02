import PropTypes from "prop-types";
import { useState } from "react";

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
  backgroundColor: theme.palette.warning.main,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  borderRadius: "16px",
}));

const TransactionCard = ({ isLoading }) => {
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
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.50rem",
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
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
                      mt: 1.75,
                      mb: 0.75,
                    }}
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                  <Icon
                    icon="mdi:bitcoin"
                    width="30"
                    height="30"
                    mt="10"
                    color="theme.palette.secondary.dark"
                  />
                </Grid>
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
                      mt: 0,
                      mb: 0.75,
                    }}
                  >
                    50
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 0 }}>
                  <Icon
                    icon="mdi:bitcoin"
                    width="30"
                    height="30"
                    mt="10"
                    color="theme.palette.secondary.dark"
                  />
                </Grid>
                {/* Need to add a view more */}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

TransactionCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TransactionCard;
