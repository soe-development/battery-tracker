"use client";
import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  Box,
  CssBaseline,
} from "@mui/material";
import { FC, PropsWithChildren, useState } from "react";
import defaultTheme from "./theme";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <Box>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </Box>
  );
};

export default ThemeProvider;
