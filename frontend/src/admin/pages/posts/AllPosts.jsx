// src/admin/pages/posts/AllPosts.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services/adminPostService"; // ✅ import service
import Loader from "../../components/Loader";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        // Safe-check: ensure data and data.posts exist
        if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Unexpected response format:", data);
          setPosts([]); // fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <Box p={3}>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={600}>
          All Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/posts/create")}
        >
          Create New Post
        </Button>
      </Box>

      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(posts) &&
                posts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((post) => (
                    <TableRow key={post._id}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={post.isPublished ? "Published" : "Draft"}
                          color={post.isPublished ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton
                            onClick={() => navigate(`/admin/post/${post._id}`)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() =>
                              navigate(`/admin/post/${post._id}`)
                            }
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={posts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AllPosts;
