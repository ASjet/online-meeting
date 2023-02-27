import React from 'react';
import { Box } from '@mui/system';

function Video(props) {

    const localStream = props.localStream;
    const remoteStream = props.remoteStream;
    let volume = props.volume

    return (
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
        </Box >
    );
}

export default Video;
