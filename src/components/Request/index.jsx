import React, { useState } from "react";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import WifiTetheringOffIcon from "@mui/icons-material/WifiTetheringOff";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import Alert from "@/components/Alert";
import { requestStreaming, cancelRequest } from "@/api/request";

const RequestingIconColor = "#777777";
const NotRequestingIconColor = "#FFFFFF";

export default function Request(props) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const room = useSelector((state) => state.room);
  const socket = props.socket;
  const reqChan = props.reqChan.port1;
  const approveChan = props.approveChan.port1;
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [alert, setAlert] = React.useState({
    open: false,
    msg: "",
    msgType: "",
  });

  approveChan.onmessage = (e) => {
    if (e.data) {
      setIsStreaming(true);
      setAlert({
        open: true,
        msg: "推流已开启",
        msgType: "success",
      });
      props.remoteStream.current.srcObject =
        props.localStream.current.srcObject;
    } else {
      setIsStreaming(false);
      setAlert({
        open: true,
        msg: "推流请求被拒绝",
        msgType: "error",
      });
    }
    setIsRequesting(false);
  };

  if (socket) {
    socket.on("streaming_response", (data) => {
      if (data.approve) {
        setIsStreaming(true);
        setAlert({
          open: true,
          msg: "推流已开启",
          msgType: "success",
        });
        props.localStream.getTracks().forEach((track) => {
          props.rtc.addTrack(track, localStream);
        });
      } else {
        setIsStreaming(false);
        setAlert({
          open: true,
          msg: "推流请求被拒绝",
          msgType: "error",
        });
      }
      setIsRequesting(false);
    });
  }

  function handleRequest() {
    if (isRequesting) {
      cancelRequest(room.room_id)
        .then((res) => {
          reqChan.postMessage({
            id: auth.username,
            name: auth.username,
            cancel: true,
          });
          setIsRequesting(false);
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
    } else if (isStreaming) {
      setIsStreaming(false);
      setIsRequesting(false);
      setAlert({
        open: true,
        msg: "推流已关闭",
        msgType: "success",
      });
      props.remoteStream.current.srcObject = null;
    } else {
      requestStreaming(room.room_id)
        .then((res) => {
          reqChan.postMessage({
            id: auth.username,
            name: auth.username,
            cancel: false,
          });
          setIsRequesting(true);
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
  }

  return (
    <>
      <Alert ctl={alert} setCtl={setAlert} />
      <IconButton
        onClick={handleRequest}
        style={{
          marginInline: "10px",
          padding: 0,
          color: isRequesting ? RequestingIconColor : NotRequestingIconColor,
        }}
      >
        {isStreaming ? <WifiTetheringOffIcon /> : <PodcastsIcon />}
      </IconButton>
    </>
  );
}
