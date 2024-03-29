import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

export default function CreateRoom(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formRoomName = data.get("roomname");
    onClose(formRoomName);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>创建会议室</DialogTitle>
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{
          ml: "20px",
          mr: "20px",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="roomname"
          label="Room Name"
          name="roomname"
          autoComplete="roomname"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          创建
        </Button>
      </Box>
    </Dialog>
  );
}
