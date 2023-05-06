import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { userRegister } from "@/api/user";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert elevation={6} ref={ref} severity={props.severity}>
      {props.message}
    </MuiAlert>
  );
});

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState({
    open: false,
    msg: "",
    msgType: "",
  });

  function closeAlert() {
    setAlert({
      open: false,
      msg: alert.msg,
      msgType: alert.msgType,
    });
  }

  function handleRegister(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formUsername = data.get("username");
    const formPassword = data.get("password");

    userRegister(formUsername, formPassword)
      .then((res) => {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            username: formUsername,
            token: res.data.token,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        setAlert({
          open: true,
          msg: err.message,
          msgType: "error",
        });
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={closeAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={alert.msgType}
          sx={{ width: "100%" }}
          message={alert.msg}
        />
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            // noValidate
            onSubmit={handleRegister}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/user/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
