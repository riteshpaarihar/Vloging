
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   Snackbar,
//   Alert,
//   Tooltip,
//   MenuItem,
//   Select,
//   Pagination,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import LockResetIcon from "@mui/icons-material/LockReset";
// import { fetchUsers, removeUser, resetPassword } from "../../store/slices/adminUserSlice";
// import Loader from "../../components/Loader";

// const AllUsers = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.adminUsers);

//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     if (confirm("Are you sure to delete this user?")) {
//       try {
//         await dispatch(removeUser(id)).unwrap();
//         setSnackbar({ open: true, message: "User deleted successfully", severity: "success" });
//       } catch (err) {
//         setSnackbar({ open: true, message: err.message || "Failed to delete", severity: "error" });
//       }
//     }
//   };

//   const handleResetPassword = async (id) => {
//     const newPassword = prompt("Enter new password:");
//     if (newPassword) {
//       try {
//         await dispatch(resetPassword(id, { password: newPassword })).unwrap();
//         setSnackbar({ open: true, message: "Password reset successfully", severity: "success" });
//       } catch (err) {
//         setSnackbar({ open: true, message: err.message || "Reset failed", severity: "error" });
//       }
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page when limit changes
//   };

//   const handlePageChange = (_, value) => {
//     setCurrentPage(value);
//   };

//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);
//   const totalPages = Math.ceil(users.length / rowsPerPage);

//   return (
//     <Box p={4}>
//       <Typography variant="h4" mb={2}>User Management</Typography>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <FormControl size="small">
//           <InputLabel id="rows-select-label">Rows</InputLabel>
//           <Select
//             labelId="rows-select-label"
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//           >
//             {[10, 20, 30, 50, 100].map((num) => (
//               <MenuItem key={num} value={num}>{num}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//           variant="outlined"
//         />
//       </Box>

//       {loading ? (
//         <Loader/>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Username</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedUsers.map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell align="center">
//                   <Tooltip title="View">
//                     <IconButton component={Link} to={`/admin/users/${user._id}`} color="primary">
//                       <VisibilityIcon />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Reset Password">
//                     <IconButton onClick={() => handleResetPassword(user._id)} color="info">
//                       <LockResetIcon />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete User">
//                     <IconButton onClick={() => handleDelete(user._id)} color="error">
//                       <DeleteIcon />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </Box>
//   );
// };

// export default AllUsers;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  Pagination,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import { fetchUsers, removeUser, resetPassword } from "../../store/slices/adminUserSlice";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminUsers);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this user?")) {
      try {
        await dispatch(removeUser(id)).unwrap();
        setSnackbar({ open: true, message: "User deleted successfully", severity: "success" });
      } catch (err) {
        setSnackbar({ open: true, message: err.message || "Failed to delete", severity: "error" });
      }
    }
  };

  const handleResetPassword = async (id) => {
    const newPassword = prompt("Enter new password:");
    if (newPassword) {
      try {
        await dispatch(resetPassword(id, { password: newPassword })).unwrap();
        setSnackbar({ open: true, message: "Password reset successfully", severity: "success" });
      } catch (err) {
        setSnackbar({ open: true, message: err.message || "Reset failed", severity: "error" });
      }
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>User Management</Typography>

      <Popup
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControl size="small">
          <InputLabel id="rows-select-label">Rows</InputLabel>
          <Select
            labelId="rows-select-label"
            value={rowsPerPage}
            label="Rows"
            onChange={handleRowsPerPageChange}
          >
            {[10, 20, 30, 50, 100].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
        />
      </Box>

      {loading ? (
        <Loader />
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton component={Link} to={`/admin/users/${user._id}`} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reset Password">
                    <IconButton onClick={() => handleResetPassword(user._id)} color="info">
                      <LockResetIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton onClick={() => handleDelete(user._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default AllUsers;
