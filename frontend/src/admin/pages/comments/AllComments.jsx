
import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminComments,
  removeAdminComment,
} from "../../store/slices/adminCommentSlice";
import Loader from "../../components/Loader";

const AllComments = () => {
  const dispatch = useDispatch();
  const { comments = [], loading, error } = useSelector(
    (state) => state.adminComments || {}
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [paginatedComments, setPaginatedComments] = useState([]);

  // Total pages based on current comments & limit
  const totalPages = Math.ceil(comments.length / limit);

  useEffect(() => {
    dispatch(fetchAdminComments());
  }, [dispatch]);

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setPaginatedComments(comments.slice(start, end));
  }, [comments, page, limit]);

  const handleRefresh = () => {
    dispatch(fetchAdminComments());
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this comment?")) {
      dispatch(removeAdminComment(id));
    }
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1); // reset to page 1 when changing limit
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Comment Management
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {loading ? (
        <Loader />
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <>
          <Table sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Author</strong></TableCell>
                <TableCell><strong>Comment</strong></TableCell>
                <TableCell><strong>Post</strong></TableCell>
                <TableCell><strong>Parent ID</strong></TableCell>
                <TableCell><strong>Likes</strong></TableCell>
                <TableCell><strong>Replies</strong></TableCell>
                <TableCell><strong>Created</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedComments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell>
                    {typeof comment.user === "object"
                      ? comment.user?.username || "N/A"
                      : comment.user || "N/A"}
                  </TableCell>
                  <TableCell>{comment.text}</TableCell>
                  <TableCell>
                    {typeof comment.post === "object"
                      ? comment.post?.title || "N/A"
                      : comment.post || "N/A"}
                  </TableCell>
                  <TableCell>{comment.parentComment || "—"}</TableCell>
                  <TableCell>{comment.likeCount}</TableCell>
                  <TableCell>{comment.replyCount}</TableCell>
                  <TableCell>
                    {new Date(comment.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(comment._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
            <FormControl size="small">
              <InputLabel>Rows</InputLabel>
              <Select value={limit} label="Rows" onChange={handleLimitChange}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllComments;
