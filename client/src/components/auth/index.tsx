"use client";

import { Box, Paper, Typography, Divider } from "@mui/material";
import AuthButton from "./AuthButton";
import AuthFields from "./AuthFields";
import AuthSnackbar from "./AuthSnackbar";
import Footer from "../cabinet/layout/Footer";

const Auth = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/static/images/authbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0b2950a3",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          mx: "auto",
          bottom: 100,
          width: 350,
          borderRadius: 8,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#f8faff",
            borderRadius: 3,
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
      <Footer />
    </Box>
  );
};

export default Auth;
