// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import DnsIcon from "@mui/icons-material/Dns";

// used for styling the card
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
  color: "#fff",
  position: "relative",
  borderRadius: "16px",
}));

const AddressesCard = (props) => {
  const { sx, addresses } = props;
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
                      backgroundColor: theme.palette.primary[800],
                      mt: 1,
                    }}
                  >
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
                    {/* Adds in all the addresses */}
                    {addresses.map((address, i) => (
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 300,
                          mt: 1.5,
                          ml: 1,
                        }}
                      >
                        <strong>{i}:</strong> {address.slice(0, 16)}...
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
