import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { initP2PConnection } from "@/api/room";
import Panel from "./panel";

export default function Video(props) {
  const room = useSelector((state) => state.room);
  const socket = props.socket;
  const frameBox = useRef();
  const localStream = useRef();
  const remoteStream = useRef();

  const defaultVolume = 60;
  const [fullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);

  const peerConnection = new RTCPeerConnection({
    iceServers: room.ice_servers,
  });

  const fullscreenStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
  };
  const normalStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    async function createOffer() {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      return offer;
    }

    createOffer()
      .then((offer) => {
        return initP2PConnection(room.room_id, offer);
      })
      .then((res) => {
        const remoteDesc = new RTCSessionDescription(res.data.answer);
        return peerConnection.setRemoteDescription(remoteDesc);
      })
      .then(() => {
        peerConnection.addEventListener("mainTrack", async (event) => {
          const [remoteStream] = event.streams;
          remoteStream.srcObject = remoteStream;
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Box
      style={{
        margin: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "960px",
        height: "720px",
      }}
    >
      <Box style={fullscreen ? fullscreenStyle : normalStyle} ref={frameBox}>
        <Box
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background: "#000000",
          }}
        >
          <video
            ref={remoteStream}
            autoPlay
            volume={volume}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "#000000",
            }}
          />
          <Box
            style={{
              padding: 0,
              margin: "10px",
              width: "192px",
              height: "144px",
              position: "absolute",
              display: "flex",
              right: "20px",
              bottom: "50px",
              zIndex: 20,
            }}
          >
            <video
              ref={localStream}
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                background: "#000000",
              }}
            />
          </Box>
        </Box>
        <Panel
          socket={socket}
          rtc={peerConnection}
          localStream={localStream}
          remoteStream={remoteStream}
          volume={volume}
          setVolume={setVolume}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />
      </Box>
    </Box>
  );
}
