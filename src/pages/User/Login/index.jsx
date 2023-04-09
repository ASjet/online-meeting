import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { userLogin } from "@/api/user";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert elevation={6} ref={ref} severity={props.severity}>
      {props.message}
    </MuiAlert>
  );
});

const theme = createTheme();

export default function SignIn() {
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    return <Navigate to="/" replace />;
  }

  const dispatch = useDispatch();
  const [alert, setAlert] = React.useState({
    open: false,
    msg: "",
    msgType: "",
  });
  const closeAlert = () => {
    setAlert({
      open: false,
      msg: alert.msg,
      msgType: alert.msgType,
    });
  };

  const navigate = useNavigate();
  const [username, setUsername] = React.useState(storedUsername || "");
  const [password, setPassword] = React.useState(storedPassword || "");
  const [rememberUsername, setRememberUsername] = React.useState(
    storedUsername ? true : false
  );
  const [rememberPassword, setRememberPassword] = React.useState(
    storedPassword ? true : false
  );
  const handleRememberUsername = (event) => {
    setRememberUsername(event.target.checked);
    if (!event.target.checked) {
      setRememberPassword(event.target.checked);
    }
  };
  const handleRememberPassword = (event) => {
    setRememberPassword(event.target.checked);
    if (event.target.checked) {
      setRememberUsername(event.target.checked);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formUsername = data.get("username");
    const formPassword = data.get("password");

    if (rememberUsername) {
      setUsername(formUsername);
    } else {
      setUsername("");
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }

    userLogin(formUsername, formPassword)
      .then((res) => {
        dispatch.user.setUserInfo({ username: storedUsername });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            username: formUsername,
            token: res.data.token,
          })
        );

        if (rememberUsername) {
          localStorage.setItem("username", formUsername);
          if (rememberPassword) {
            localStorage.setItem("password", formPassword);
          } else {
            localStorage.removeItem("password");
          }
        } else {
          localStorage.removeItem("username");
        }

        navigate("/");
      })
      .catch((err) => {
        setPassword("");
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              defaultValue={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me"
              checked={rememberUsername}
              onChange={handleRememberUsername}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Save Password"
              checked={rememberPassword}
              onChange={handleRememberPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/user/register" variant="body2">
                  {"Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
