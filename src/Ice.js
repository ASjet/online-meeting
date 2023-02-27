import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

function Ice() {
    const addr = useRef();
    const port = useRef();
    const username = useRef();
    const password = useRef();
    const uid = useRef();

    function login() {
        alert(JSON.stringify({
            addr: addr.current.value,
            port: port.current.value,
            username: username.current.value,
            password: password.current.value,
            uid: uid.current.value
        }));
    }

    return (
        <Box
            style={{
                margin: "16px",
            }}
        >
            <Paper
                elevation={6}
                style={{
                    textAlign: "center",
                    margin: "10px",
                    padding: "10px",
                }}
            >ICE配置</Paper>
            <List>
                <TextField
                    id="server-addr"
                    label="服务器地址"
                    variant="standard"
                    inputRef={addr}
                />
            </List>
            <List>
                <TextField
                    id="server-port"
                    label="服务器端口"
                    variant="standard"
                    inputRef={port}
                />
            </List>
            <List>
                <TextField
                    id="user-id"
                    label="用户ID"
                    variant="standard"
                    inputRef={uid}
                />
            </List>
            <List>
                <TextField
                    id="username"
                    label="用户名"
                    variant="standard"
                    inputRef={username}
                />
            </List>
            <List>
                <TextField
                    id="password"
                    label="密码"
                    variant="standard"
                    type="password"
                    inputRef={password}
                />
            </List>
            <List>
                <Button
                    variant="contained"
                    onClick={login}
                    style={{
                        width: "100%"
                    }}
                >登陆</Button>
            </List>
        </Box>
    );
}


export default Ice;
