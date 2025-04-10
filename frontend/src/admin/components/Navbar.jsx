import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Brightness4 as LightModeIcon,
  Brightness7 as DarkModeIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Navbar = ({ onSidebarToggle, toggleTheme, currentTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(30,30,48,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        component={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}
      >
        {/* Left Side */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            onClick={onSidebarToggle}
            sx={{ color: "#fff", display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontFamily: "Poppins",
              color: "#fff",
              letterSpacing: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* Search Bar (hidden on mobile) */}
        {!isMobile && (
          <Box
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              gap: 1,
              flexGrow: 1,
              mx: 4,
              maxWidth: 400,
            }}
          >
            <SearchIcon sx={{ color: "#aaa" }} />
            <InputBase
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ color: "#fff", width: "100%" }}
            />
          </Box>
        )}

        {/* Right Side */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Theme Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton color="inherit" onClick={toggleTheme}>
              {currentTheme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton sx={{ color: "#fff" }}>
              <Badge badgeContent={3} color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Avatar Menu */}
          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: "Poppins",
                }}
              >
                A
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
