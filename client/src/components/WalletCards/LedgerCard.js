import React from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import EarningIcon from "../../images/icons/earning.svg";
import { Icon } from "@iconify/react";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  position: "relative",
  borderRadius: "16px",
}));

// used for styling the card
const LedgerCard = (props) => {
  const { sx, ledger } = props;
  const theme = useTheme();

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
                      backgroundColor: theme.palette.secondary.main[800],
                      mt: 1,
                    }}
                  >
                    <img src={EarningIcon} alt="Notification" />
                  </Avatar>
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
                  {/* Adds in every payment from the ledger */}
                  {ledger.map((payment) => (
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 300,
                        mt: 1.5,
                        ml: 1,
                        mr: 20,
                      }}
                    >
                      <strong>{payment[3]}: </strong>
                      {payment[0] == "sent" ? "Sent     " : "Recieved "}
                      {payment[2].toFixed(5)}
                      <Icon
                        icon="mdi:bitcoin"
                        width="30"
                        height="30"
                        color="theme.palette.secondary.dark"
                      />
                    </Typography>
                  ))}
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
