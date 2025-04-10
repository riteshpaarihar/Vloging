// src/components/Popup.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";

const Popup = ({ open, severity = "success", message, onClose }) => {
  const isSuccess = severity === "success";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: isSuccess ? "#e0f7fa" : "#ffebee" }}>
        <Typography variant="h6" color={isSuccess ? "success.main" : "error.main"}>
          {isSuccess ? "Success" : "Error"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
