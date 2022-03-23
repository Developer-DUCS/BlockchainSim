import React from "react";
import { Snackbar, LinearProgress } from "@mui/material";

import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Feedback = (props) => {
  const { feedbackObj, open, setOpen } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={feedbackObj.duration || 5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={feedbackObj.severity}
        sx={{ width: "100%" }}
      >
        {feedbackObj.message}
        {feedbackObj.loading ? <LinearProgress /> : ""}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
