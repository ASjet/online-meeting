import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Video from "@/components/Video";
import RequestList from "@/components/RequestList";

export default function (props) {
  const room = useSelector((state) => state.room);
  const socket = io.connect(room.socket_addr);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Video socket={socket} />
      <RequestList socket={socket} />
    </Box>
  );
}
