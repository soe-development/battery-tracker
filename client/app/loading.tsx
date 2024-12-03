// loading.js
import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <LinearProgress />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <img
          src="/static/images/battery.gif"
          alt="Loading..."
          style={{ width: "200px", height: "240px" }}
        />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading;
