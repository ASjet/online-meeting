import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import { Outlet } from "react-router-dom";

function LoginLayout() {
  return (
    <Box
      style={{
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
      }}
    >
      <Outlet></Outlet>
    </Box>
  );
}

export default LoginLayout;
