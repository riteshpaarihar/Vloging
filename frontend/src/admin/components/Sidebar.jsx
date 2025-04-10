import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Toolbar,
  useTheme,
  Box,
  Divider,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Message as MessageIcon,
  Comment as CommentIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onSidebarToggle }) => {
  const theme = useTheme();
  const location = useLocation();

  const isPostsActive = [
    "/admin/post",
    "/admin/post/create",
  ].some((path) => location.pathname.startsWith(path));

  const [openPosts, setOpenPosts] = useState(isPostsActive);

  const drawer = (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "rgba(20,20,40,0.95)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          px: 1,
          pt: 1,
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(20,20,40,0.95)",
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={onSidebarToggle}
          sx={{ display: { md: "none" }, color: "#fff", ml: "auto" }}
        >
          <CloseIcon />
        </IconButton>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
      </Box>

      <List sx={{ flex: 1, mt: 2 }}>
        {/* Helper for items */}
        {[
          {
            to: "/admin",
            icon: <DashboardIcon />,
            label: "Dashboard",
          },
          {
            to: "/admin/users",
            icon: <PeopleIcon />,
            label: "Users",
          },
          {
            to: "/admin/comments",
            icon: <CommentIcon />,
            label: "Comments",
          },
          {
            to: "/admin/messages",
            icon: <MessageIcon />,
            label: "Messages",
          },
          // {
          //   to: "/admin/settings",
          //   icon: <SettingsIcon />,
          //   label: "Settings",
          // },
        ].map(({ to, icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <ListItem
              key={label}
              component={NavLink}
              to={to}
              sx={{
                textDecoration: "none",
                color: isActive ? theme.palette.primary.main : "#ddd",
                backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                borderRadius: 1,
                margin: "4px 8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          );
        })}

        {/* Posts */}
        <ListItem
          onClick={() => setOpenPosts((prev) => !prev)}
          sx={{
            mx: 1,
            borderRadius: 1,
            backgroundColor: isPostsActive ? "rgba(255,255,255,0.08)" : "transparent",
            color: isPostsActive ? theme.palette.primary.main : "#fff",
            cursor: "pointer",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Post" />
          {openPosts ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openPosts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={NavLink}
              to="/admin/post"
              end
              sx={{
                color: location.pathname === "/admin/post" ? theme.palette.primary.main : "#ccc",
                backgroundColor: location.pathname === "/admin/post" ? "rgba(255,255,255,0.08)" : "transparent",
                borderRadius: 1,
                margin: "4px 16px",
                pl: 4,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <ListItemText primary="All Posts" />
            </ListItem>

            <ListItem
              component={NavLink}
              to="/admin/post/create"
              sx={{
                color: location.pathname === "/admin/post/create" ? theme.palette.primary.main : "#ccc",
                backgroundColor: location.pathname === "/admin/post/create" ? "rgba(255,255,255,0.08)" : "transparent",
                borderRadius: 1,
                margin: "4px 16px",
                pl: 4,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <ListItemText primary="Create Post" />
            </ListItem>
          </List>
        </Collapse>

      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onSidebarToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "rgba(20,20,40,0.95)",
            color: "#fff",
            overflow: "visible",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "rgba(20,20,40,0.95)",
            color: "#fff",
            overflow: "visible",
          },
        }}
        open
      >
        <Toolbar sx={{ minHeight: "64px !important" }} />
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
