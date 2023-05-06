import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AlertWrapper = React.forwardRef((props, ref) => {
  return (
    <MuiAlert elevation={6} ref={ref} severity={props.severity}>
      {props.message}
    </MuiAlert>
  );
});

export default function Alert(props) {
  let position = {
    vertical: "top",
    horizontal: "center",
  };
  if (props.position) {
    position.vertical = props.position.vertical;
    position.horizontal = props.position.horizontal;
  }

  function closeAlert() {
    props.setCtl({
      ...props.ctl,
      open: false,
    });
  }

  return (
    <Snackbar
      open={props.ctl.open}
      autoHideDuration={1000}
      onClose={closeAlert}
      anchorOrigin={position}
    >
      <AlertWrapper
        severity={props.ctl.msgType}
        sx={{ width: "100%" }}
        message={props.ctl.msg}
      />
    </Snackbar>
  );
}
