import React, { useState } from 'react';
import { Box } from '@mui/system';
import Slider from '@mui/material/Slider';
import ToggleIcon from "./ToggleIcon";
import Ice from "./Ice"
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
import SettingsIcon from '@mui/icons-material/Settings';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '@mui/material';


function Panel(props) {
    const localStream = props.localStream;
    const remoteStream = props.remoteStream;
    let fullscreen = props.fullscreen;
    const setFullscreen = props.setFullscreen;
    let volume = props.volume;
    const setVolume = props.setVolume;

    const [mute, setMute] = useState(false);
    const [volumeIcon, setVolumeIcon] = useState(VolumeUp);

    const [camera, setCamera] = useState(false);
    const [mic, setMic] = useState(false);
    const [screenSharing, setScreenSharing] = useState(true);

    const [drawer, setDrawer] = useState(false);

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

    function toggleFullscreen() {
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }

        setFullscreen(!fullscreen);
    }

    function toggleDrawer() {
        setDrawer(!drawer);
    }

    return (
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
                <IconButton
                    onClick={toggleDrawer}
                    style={{
                        marginInline: "10px",
                        padding: 0,
                        color: "#FFFFFF",
                    }}
                >
                    <SettingsIcon />
                </IconButton>
                <Drawer
                    anchor={"right"}
                    open={drawer}
                    onClose={toggleDrawer}
                >
                    <Ice></Ice>
                </Drawer>
                <ToggleIcon
                    onClick={toggleFullscreen}
                    toggle={fullscreen}
                    enable={FullscreenExitIcon}
                    disable={FullscreenIcon} />
            </div>
        </Box>
    );
}

export default Panel;
