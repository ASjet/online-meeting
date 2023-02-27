import './App.css';
import React, { useRef, useState } from 'react';
import { Box } from '@mui/system';
import Video from './Video';
import Panel from "./Panel"

function App() {

  const frameBox = useRef();
  const localStream = useRef();
  const remoteStream = useRef();

  const defaultVolume = 60;
  const [fullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);

  const fullscreenStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
  }
  const normalStyle = {
    position: "relative",
    width: "100%",
    height: "100%",

  }

  return (
    <div className="App"
      style={{
        width: "980px",
      }}
    >
      <h1>浏览器端WebRTC视频流推流设计与实现</h1>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "960px",
          height: "720px",
        }}
      >
        <Box style={fullscreen ? fullscreenStyle : normalStyle}
          ref={frameBox}
        >
          <Video
            volume={volume}
            localStream={localStream}
            remoteStream={remoteStream}
          />
          <Panel
            localStream={localStream}
            remoteStream={remoteStream}
            volume={volume}
            setVolume={setVolume}
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
          />
        </Box >

      </div>
    </div>
  );
}

export default App;
