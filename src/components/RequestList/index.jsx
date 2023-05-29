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
import { useSelector } from "react-redux";
import { approveStreaming } from "@/api/request";
import Alert from "@/components/Alert";

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
  const [reqs, setReqs] = useState([]);
  const room = useSelector((state) => state.room);
  const reqChan = props.reqChan.port2;
  const approveChan = props.approveChan.port2;
  const [alert, setAlert] = React.useState({
    open: false,
    msg: "",
    msgType: "",
  });

  if (props.socket) {
    props.socket.on("streaming_request", (data) => {
      addReq(data.name, data.id);
    });
  }

  reqChan.onmessage = (e) => {
    if (e.data.cancel) {
      removeReq(e.data.id);
    } else {
      addReq(e.data.name, e.data.id);
    }
  };

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
        approveChan.postMessage(approve);
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
      <Alert ctl={alert} setCtl={setAlert} />
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
