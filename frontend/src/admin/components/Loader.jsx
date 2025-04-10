import React from "react";
import { Box, Typography } from "@mui/material";

const Loader = ({ text = "Loading..." }) => {
  return (
    <Box
      height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          border: "6px solid #cfcfcf",
          borderTop: "6px solid #1976d2",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          mb: 2,
        }}
      />
      <Typography variant="body1" color="textSecondary">
        {text}
      </Typography>

      {/* Keyframes for spin animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default Loader;
