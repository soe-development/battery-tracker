import { requestLogOut } from "@/api/auth";
import UserContext from "@/context/UserContext";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useContext, useState } from "react";

const UserIcon = () => {
  const { user, clearUser } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ mx: 2 }}>
        <Typography>{user?.name}</Typography>
      </Box>
      <Tooltip title={""}>
        <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            clearUser();
            console.log(user);
          }}
        >
          <Typography textAlign="center">Вийти</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserIcon;
