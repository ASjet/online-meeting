import React from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Video from "@/components/Video";

export default function (props) {
  const room = useSelector((state) => state.room);
  const socketio = io.connect(room.socket_addr);
  return <Video socket={socketio} />;
}
