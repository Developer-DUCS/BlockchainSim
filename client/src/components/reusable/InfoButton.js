import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const InfoButton = (props) => {
  const { sx, title, description } = props;

  const MyToolTipStyle = styled(({ className, ...props }) => (
    <Tooltip arrow placement="top" {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      fontSize: 15,
    },
  }));

  return (
    <>
      <MyToolTipStyle
        title={
          <React.Fragment>
            <Typography color="inherit">
              <u>
                <b>{title}</b>
              </u>
            </Typography>
            <em>{description}</em>
          </React.Fragment>
        }
      >
        <InfoTwoToneIcon fontSize="md" sx={sx} />
      </MyToolTipStyle>
    </>
  );
};

export default InfoButton;
