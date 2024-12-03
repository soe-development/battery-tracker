"use client";
import {
  Alert,
  AppBar,
  Badge,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import UserIcon from "./UserIcon";
import NavigationMenu from "./NavigationMenu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getNotificationsData, updateNotifications } from "@/api/notification";
import Link from "next/link";

const Header = () => {
  const { update, rowsTopTable } = useContext(TableContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    if (unreadNotifications.length > 0) {
      const updateData = unreadNotifications.map((item: any) => ({
        ...item,
        status: "read",
      }));

      updateNotifications(updateData).then(() => {
        setUnreadNotifications([]);
      });
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getNotificationsData()
      .then((response) => {
        setNotifications(response.data);
        setUnreadNotifications(
          response.data.filter((item: any) => item.status === "unread")
        );
      })
      .catch((err) => console.error("Error fetching notifications:", err));
  }, [rowsTopTable, update]);

  return (
    <AppBar position="static" sx={{ minWidth: "950px", mb: 2 }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <NavigationMenu />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <Badge badgeContent={unreadNotifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                maxHeight: 400,
                width: "700px",
              },
            }}
          >
            {notifications.map((notification: any, index: number) => (
              <MenuItem
                key={index}
                onClick={handleCloseMenu}
                component={Link}
                href={notification.route}
              >
                <Alert
                  severity={notification.severity}
                  sx={{
                    width: 1,
                    color:
                      notification.severity === "error" ? "#d94849" : "#ed6c02",
                    borderColor:
                      notification.severity === "error" ? "#d94849" : "#ed6c02",
                    border: 1,
                    "& .MuiAlert-icon": {
                      color:
                        notification.severity === "error"
                          ? "#d94849"
                          : "#ed6c02",
                    },
                  }}
                >
                  {notification.text + notification.tableId}
                </Alert>
              </MenuItem>
            ))}
            {notifications.length === 0 && (
              <MenuItem disabled>No notifications</MenuItem>
            )}
          </Menu>
          <UserIcon />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
