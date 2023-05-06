import React, { useState } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { approveStreaming } from "@/api/request";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert elevation={6} ref={ref} severity={props.severity}>
      {props.message}
    </MuiAlert>
  );
});

const defaultRequestList = [
  {
    id: 1,
    name: "test",
  },
  {
    id: 2,
    name: "123",
  },
];

export default function (props) {
  const room = useSelector((state) => state.room);
  const [reqs, setReqs] = useState(defaultRequestList);

  if (props.socket) {
    props.socket.on("streaming_request", (data) => {
      addReq(data.name, data.id);
    });
  }

  function addReq(name, id) {
    setReqs([...reqs, { name: name, id: id }]);
  }

  function removeReq(id) {
    setReqs(reqs.filter((req) => req.id !== id));
  }

  function handleApprove(req, approve) {
    approveStreaming(room.room_id, req.id, approve)
      .then((res) => {
        removeReq(req.id);
        setAlert({
          open: true,
          msg: res.message,
          msgType: "success",
        });
      })
      .catch((err) => {
        setAlert({
          open: true,
          msg: err.message,
          msgType: "error",
        });
      });
  }

  const [alert, setAlert] = React.useState({
    open: false,
    msg: "",
    msgType: "",
  });
  const closeAlert = () => {
    setAlert({
      open: false,
      msg: alert.msg,
      msgType: alert.msgType,
    });
  };

  function renderReqs(reqs) {
    return reqs.map((req) => {
      return (
        <Paper elevation={6} style={{ textAlign: "center", margin: "8px" }}>
          <ListItem
            key={req.id}
            secondaryAction={
              <Box>
                <IconButton
                  sx={{ margin: 0, padding: 0 }}
                  edge="end"
                  aria-label="approve"
                  color="success"
                  onClick={() => {
                    handleApprove(req, true);
                  }}
                >
                  <DoneIcon />
                </IconButton>
                <IconButton
                  sx={{ margin: 0, padding: 0 }}
                  edge="end"
                  aria-label="reject"
                  color="error"
                  onClick={() => {
                    handleApprove(req, false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            }
          >
            <AccountCircle sx={{ mr: 1 }} />
            <ListItemText sx={{ mr: "1.5em" }} primary={req.name} />
          </ListItem>
        </Paper>
      );
    });
  }

  return (
    <Box sx={{ ml: 2, mr: 2, width: "16em" }}>
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={closeAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          severity={alert.msgType}
          sx={{ width: "100%" }}
          message={alert.msg}
        />
      </Snackbar>
      <Paper
        elevation={6}
        style={{
          textAlign: "center",
          margin: 0,
          padding: "10px",
        }}
      >
        <Typography variant="h6" component="div">
          推流请求
        </Typography>
      </Paper>
      <List dense={false}>{renderReqs(reqs)}</List>
    </Box>
  );
}
