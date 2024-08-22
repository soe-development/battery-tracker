"use client";
import { AppBar, Container, Toolbar } from "@mui/material";
import UserIcon from "./UserIcon";
import NavigationMenu from "./NavigationMenu";

const Header = () => {
  return (
    <AppBar position="static" sx={{ minWidth: "950px", mb: 2 }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <NavigationMenu />
          <UserIcon />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
