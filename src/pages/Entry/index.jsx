import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import CreateRoom from "./create";
import JoinRoom from "./join";
import { createRoom, getRoomInfo } from "@/api/room";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert elevation={6} ref={ref} severity={props.severity}>
      {props.message}
    </MuiAlert>
  );
});

function Entry() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roomInfo, setRoomInfo] = React.useState({});
  const [openCreateDia, setOpenCreateDia] = React.useState(false);
  const [openJoinDia, setOpenJoinDia] = React.useState(false);
  const [openCreateInfoDia, setOpenCreateInfoDia] = React.useState(false);

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

  const handleConfirmJoin = (confirm) => {
    if (confirm && roomInfo) {
      dispatch.room.setRoomInfo(roomInfo);
      if (roomInfo.is_admin) {
        navigate("/room/admin");
      } else {
        navigate("/room/guest");
      }
    }
    setOpenJoinDia(false);
  };

  function handleJoin(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const roomId = data.get("roomId");
    getRoomInfo(roomId)
      .then((res) => {
        setRoomInfo(res);
        setOpenJoinDia(true);
      })
      .catch((err) => {
        setAlert({
          open: true,
          msg: err.message,
          msgType: "error",
        });
      });
  }

  const handleOpenCreateDia = () => {
    setOpenCreateDia(true);
  };

  const handleCreate = (roomName) => {
    setOpenCreateDia(false);
    if (roomName) {
      createRoom(roomName)
        .then((res) => {
          setRoomInfo(res);
          setOpenCreateInfoDia(true);
        })
        .catch((err) => {
          setAlert({
            open: true,
            msg: err.message,
            msgType: "error",
          });
        });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
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
      <form onSubmit={handleJoin} action="#">
        <TextField
          id="outlined-password-input"
          label="会议室ID"
          autoComplete="current-password"
          variant="outlined"
          name="roomId"
          sx={{
            width: "100%",
          }}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          加入
        </Button>
      </form>
      <Button fullWidth variant="contained" onClick={handleOpenCreateDia}>
        创建
      </Button>
      <JoinRoom
        open={openJoinDia}
        roomInfo={roomInfo}
        onClose={handleConfirmJoin}
      />
      <CreateRoom open={openCreateDia} onClose={handleCreate} />
      <Dialog
        open={openCreateInfoDia}
        onClose={handleConfirmJoin}
        PaperComponent={Paper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          新创建的会议室信息，请将其分享给其他人
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{JSON.stringify(roomInfo)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmJoin}>确认并加入</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Entry;
