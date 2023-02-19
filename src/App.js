import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Video from './Video';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

function App() {
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
        <Video />
      </div>
    </div>
  );
}

export default App;
