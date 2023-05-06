import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { createRoom, getRoomInfo } from "@/api/room";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/Alert";
import CreateRoom from "./create";
import JoinRoom from "./join";

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

  function handleConfirmJoin(confirm) {
    if (confirm && roomInfo) {
      dispatch.room.setRoomInfo(roomInfo);
      if (roomInfo.is_admin) {
        navigate("/room/admin");
      } else {
        navigate("/room/guest");
      }
    }
    setOpenJoinDia(false);
    setOpenCreateDia(false);
  }

  function handleJoin(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const roomId = data.get("roomId").replace(/\s/g, "");
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

  function handleOpenCreateDia() {
    setOpenCreateDia(true);
  }

  function handleCreate(roomName) {
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
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Alert ctl={alert} setCtl={setAlert} />
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
        onClose={() => {
          setOpenCreateInfoDia(false);
        }}
        PaperComponent={Paper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          会议室「{roomInfo.room_name}」的ID如下，请将其分享给其他人
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>
            <Typography variant="h5" component="div">
              {String(roomInfo.room_id).replace(
                /(\d{3})(\d{3})(\d{3})/,
                "$1\u00a0$2\u00a0$3"
              )}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleConfirmJoin(true);
            }}
          >
            确认并加入
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Entry;
