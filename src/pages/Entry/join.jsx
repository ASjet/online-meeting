import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";

export default function JoinRoom(props) {
  const { open, onClose, roomInfo } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleJoin = () => {
    onClose(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      PaperComponent={Paper}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        你将要加入的会议室信息
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{JSON.stringify(roomInfo)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleJoin}>加入</Button>
        <Button autoFocus onClick={handleCancel}>
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
}
