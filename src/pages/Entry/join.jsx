import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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
        即将加入由{roomInfo.creator}创建的会议室「{roomInfo.room_name}」
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleJoin}>确认</Button>
        <Button autoFocus onClick={handleCancel}>
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
}
