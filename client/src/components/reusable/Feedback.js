import React from "react";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

const Feedback = (props) => {
  const { feedbackObj, open, setOpen } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    console.log(feedbackObj);
  }, [feedbackObj]);

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={feedbackObj.severity}
        sx={{ width: "100%" }}
      >
        {feedbackObj.message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
