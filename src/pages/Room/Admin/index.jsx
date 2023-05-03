import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import Video from "@/components/Video";
import Request from "@/components/Request";

export default function (props) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Video />
      <Request />
    </Box>
  );
}
