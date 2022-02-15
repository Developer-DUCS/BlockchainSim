import PropTypes from "prop-types";
import { useState } from "react";
import { Styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const OwnerCard = (props) => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: -8, ml: 10 }}>
      <Icon
        icon="bx:bxs-user-circle"
        width="275"
        height="275"
        color="theme.palatte.primary"
      />
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 500,
          mt: -3,
          ml: 7,
        }}
      >
        ean@drury.edu
      </Typography>
    </Box>
  );
};

export default OwnerCard;
