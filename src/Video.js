import React, { useRef, useState } from 'react';
import { Box } from '@mui/system';
import Slider from '@mui/material/Slider';
import ToggleIcon from "./ToggleIcon";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';
import StopScreenShareOutlinedIcon from '@mui/icons-material/StopScreenShareOutlined';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


function Video() {
    const defaultVolume = 60;

    const frameBox = useRef();
    const localStream = useRef();
    const remoteStream = useRef();
    const [mute, setMute] = useState(false);
    const [volume, setVolume] = useState(defaultVolume);
    const [volumeIcon, setVolumeIcon] = useState(VolumeUp);

    const [camera, setCamera] = useState(false);
    const [mic, setMic] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [screenSharing, setScreenSharing] = useState(true);

    function toggleCamera() {
        if (camera) {
            if (localStream.current.srcObject != null) {
                localStream.current.srcObject.getTracks().forEach(track => track.stop());
            }
            localStream.current.srcObject = null;
        } else {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    stream.getAudioTracks()[0].enabled = mic;
                    if (localStream.current.srcObject != null) {
                        localStream.current.srcObject.getTracks().forEach(track => track.stop());
                    }
                    localStream.current.srcObject = stream;
                    localStream.current.muted = mute;
                }).catch(error => {
                    alert("Failed to getUserMedia: ", error);
                });
        }
        setCamera(!camera);
    }

    function toggleMic() {
        if (mic) {
            if (localStream.current.srcObject != null) {
                localStream.current.srcObject.getAudioTracks()[0].enabled = false;
            }
        } else {
            if (localStream.current.srcObject != null) {
                localStream.current.srcObject.getAudioTracks()[0].enabled = true;
            }
        }
        setMic(!mic);
    }

    function toggleFullscreen() {
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }

        setFullscreen(!fullscreen);
    }

    function toggleScreenSharing() {
        if (screenSharing) {
            navigator.mediaDevices.getDisplayMedia({ video: true })
                .then(stream => {
                    if (remoteStream.current.srcObject != null) {
                        remoteStream.current.srcObject.getTracks().forEach(track => track.stop());
                    }
                    remoteStream.current.srcObject = stream;
                }).catch(error => {
                    alert("Failed to getDisplayMedia: ", error);
                })
        } else {
            if (remoteStream.current.srcObject != null) {
                remoteStream.current.srcObject.getTracks().forEach(track => track.stop());
            }
            remoteStream.current.srcObject = null;
        }
        setScreenSharing(!screenSharing);
    }

    const toggleVolume = (_, newVolume) => {
        if (newVolume === 0) {
            setVolumeIcon(VolumeMuteIcon);
        } else if (newVolume > 0 && newVolume <= 50) {
            setVolumeIcon(VolumeDown);
        } else {
            setVolumeIcon(VolumeUp);
        }

        setVolume(newVolume);
    };

    const toggleMute = () => {
        if (mute) {
            localStream.current.muted = false;
        } else {
            localStream.current.muted = true;
        }
        setMute(!mute);
    };

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
        <Box style={fullscreen ? fullscreenStyle : normalStyle}
            ref={frameBox}
        >
            <video
                ref={remoteStream}
                autoPlay
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
                    volume={volume}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        background: "#000000",
                    }}
                />
            </Box>

            <Box
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    margin: 0,
                    width: "100%",
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    bottom: 0,
                    zIndex: 10,
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <ToggleIcon
                        onClick={toggleCamera}
                        toggle={camera}
                        enable={VideocamIcon}
                        disable={VideocamOffIcon} />
                    <ToggleIcon
                        onClick={toggleMic}
                        toggle={mic}
                        enable={MicIcon}
                        disable={MicOffIcon} />
                </div>

                <div>
                    <ToggleIcon
                        onClick={toggleMute}
                        toggle={mute}
                        enable={VolumeOffIcon}
                        disable={volumeIcon} />
                    <Slider
                        aria-label="Volume"
                        value={volume}
                        onChange={toggleVolume}
                        style={{
                            marginInline: "10px",
                            padding: 0,
                            width: "100px",
                            color: "#FFFFFF",
                        }}
                    />
                    <ToggleIcon
                        onClick={toggleScreenSharing}
                        toggle={screenSharing}
                        enable={ScreenShareOutlinedIcon}
                        disable={StopScreenShareOutlinedIcon} />
                    <ToggleIcon
                        onClick={toggleFullscreen}
                        toggle={fullscreen}
                        enable={FullscreenExitIcon}
                        disable={FullscreenIcon} />
                </div>
            </Box>
        </Box >
    );
}

export default Video;
