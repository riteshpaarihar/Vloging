import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Chip,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../../components/Loader";
import {
  deleteMessage,
  fetchMessages,
  toggleReadStatus,
} from "../../store/slices/messageSlice";

const AllMessages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, loading } = useSelector((state) => state.adminMessages);

  const messageList = Array.isArray(messages) ? messages : [];

  console.log("massegeList",messageList)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   if (confirm("Are you sure to delete this message?")) {
  //     toast.promise(dispatch(deleteMessage(id)), {
  //       pending: "Deleting message...",
  //       success: "Message deleted successfully",
  //       error: "Failed to delete message",
  //     });
  //   }
  // };

  // const handleToggleRead = (id) => {
  //   toast.promise(dispatch(toggleReadStatus(id)), {
  //     pending: "Updating read status...",
  //     success: "Read status updated",
  //     error: "Failed to update status",
  //   });
  // };

  const handleRefresh = () => {
    toast.promise(dispatch(fetchMessages()), {
      pending: "Refreshing messages...",
      success: "Messages refreshed",
      error: "Failed to refresh messages",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteMessage(id));
  };

  const handleToggleRead = (id) => {
    dispatch(toggleReadStatus(id));
  };

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedMessages = messageList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          All Messages
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Sender</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Subject</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMessages.length > 0 ? (
                paginatedMessages.map((msg) => (
                  <TableRow key={msg._id}>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell>
                      <Chip
                        label={msg.isRead ? "Read" : "Unread"}
                        color={msg.isRead ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton onClick={() => navigate(`/admin/messages/${msg._id}/read`)}>
                          <VisibilityIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Toggle Read">
                        <IconButton onClick={() => handleToggleRead(msg._id)}>
                          <MarkEmailReadIcon color="info" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(msg._id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No messages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={messageList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default AllMessages;
