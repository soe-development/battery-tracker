"use client";

import { Box, Paper, Typography, Divider } from "@mui/material";
import AuthButton from "./AuthButton";
import AuthFields from "./AuthFields";
import AuthSnackbar from "./AuthSnackbar";

const Auth = () => {
  return (
    <Box
      sx={{
        mx: "auto",
        mt: 10,
        width: 350,
        borderRadius: 1,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px 5px 0 0",
            mb: 0.5,
          }}
        >
          <Box sx={{ display: "flex", mt: 2, px: 7, pt: 2 }}>
            <Box
              component="img"
              src={"/static/images/logo.svg"}
              alt="logo"
              sx={{
                width: 60,
                borderRadius: 1,
              }}
            />
            <Box sx={{ m: "auto", p: 1 }}>
              <Typography>Облік АКБ та заміни</Typography>
            </Box>
          </Box>
        </Box>
        <Divider variant="inset" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <AuthFields />
          <AuthButton />
          <AuthSnackbar />
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
