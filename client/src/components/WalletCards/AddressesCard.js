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
import DnsIcon from "@mui/icons-material/Dns";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
  color: "#fff",
  // overflow: "hidden",
  position: "relative",
  borderRadius: "16px",
  // overflow: "scroll",
}));

const AddressesCard = (props) => {
  const { sx, addresses } = props;
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
                    {/* <img src={EarningIcon} alt="Notification" /> */}
                    <DnsIcon />
                  </Avatar>
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
                        ml: 7,
                        mt: -4.5,
                        mb: 3,
                        overflow: "auto",
                      }}
                    >
                      Addresses Available
                    </Typography>
                    {addresses.map((address, i) => (
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 300,
                          mt: 1.5,
                          ml: 1,
                        }}
                      >
                        <strong>{i}:</strong> {address.slice(0, 20)}...
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default AddressesCard;
