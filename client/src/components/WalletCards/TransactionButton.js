import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

import { Icon } from "@iconify/react";

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: "#fff",
  // overflow: "hidden",
  position: "relative",
  borderRadius: "16px",
}));

const TransactionButton = (props) => {
  const { sx, title } = props;
  const theme = useTheme();

  return (
    <>
      <CardWrapper border={false} content={false} sx={sx}>
        <Box sx={{ p: 2 }}>
          <List sx={{ py: 0 }}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: theme.palette.primary[800],
                    color: "#fff",
                  }}
                >
                  {/* <TableChartOutlinedIcon fontSize="inherit" /> */}
                  <Icon icon="fa6-solid:money-bill-transfer" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  py: 0,
                  mt: 0.45,
                  mb: 0.45,
                }}
                primary={
                  <Typography
                    sx={{
                      fontSize: "1.50rem",
                      fontWeight: 500,
                      mr: 1,
                      mb: 0.75,
                    }}
                  >
                    {title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "primary.light", mt: 0.25 }}
                  >
                    Click here to make transaction
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TransactionButton;
