import { Popover } from "@mui/material";
import { Typography } from "@mui/material";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import React from "react";

const InfoButton = (props) => {
  const { sx, description } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <InfoTwoToneIcon fontSize="md" onClick={handleClick} sx={sx} />
      <Popover
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Typography sx={{ p: 2 }}>{description}</Typography>
      </Popover>
    </>
  );
};

export default InfoButton;
