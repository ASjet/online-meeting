import './App.css';
import React from 'react';
import Video from './Video';
import Login from './Login'

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

        <Login />

      </div>
    </div>
  );
}

export default App;
