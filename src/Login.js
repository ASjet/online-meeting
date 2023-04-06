import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// Send POST to /user/login
function Login() {
    return (
        <Stack spacing={2}>
            <TextField
                id="outlined-password-input"
                label="Username"
                autoComplete="current-password"
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
            />
        </Stack>
    )
}

export default Login;
