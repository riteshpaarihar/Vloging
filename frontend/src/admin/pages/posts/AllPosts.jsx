
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
} from "@mui/material";
import { Edit, Delete, Visibility, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services/adminPostService";
import Loader from "../../components/Loader";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllPosts();
      if (data && Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        console.error("Unexpected response format:", data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    fetchPosts();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <Loader />;

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
        <Box display="flex" gap={1}>
          <Tooltip title="Refresh">
            <IconButton color="primary" onClick={handleRefresh}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/post/create")}
          >
            Create New Post
          </Button>
        </Box>
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
              {posts
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
                            navigate(`/admin/post/edit/${post._id}`)
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


// import React, { useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
//   TablePagination,
//   Button,
//   Chip,
// } from "@mui/material";
// import { Edit, Delete, Visibility, Refresh } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllPosts,
//   deleteAdminPost,
// } from "../../store/slices/adminPostSlice";
// import Loader from "../../components/Loader";

// const AllPosts = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { posts, loading } = useSelector((state) => state.posts);

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   useEffect(() => {
//     dispatch(fetchAllPosts());
//   }, [dispatch]);

//   const handleRefresh = () => {
//     dispatch(fetchAllPosts());
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       dispatch(deleteAdminPost(id));
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   if (loading) return <Loader />;

//   return (
//     <Box p={3}>
//       <Box
//         mb={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Typography variant="h5" fontWeight={600}>
//           All Posts
//         </Typography>
//         <Box display="flex" gap={1}>
//           <Tooltip title="Refresh">
//             <IconButton color="primary" onClick={handleRefresh}>
//               <Refresh />
//             </IconButton>
//           </Tooltip>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/admin/post/create")}
//           >
//             Create New Post
//           </Button>
//         </Box>
//       </Box>

//       <Paper elevation={1}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Created At</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {posts
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((post) => (
//                   <TableRow key={post._id}>
//                     <TableCell>{post.title}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={post.isPublished ? "Published" : "Draft"}
//                         color={post.isPublished ? "success" : "default"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {new Date(post.createdAt).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell align="right">
//                       <Tooltip title="View">
//                         <IconButton
//                           onClick={() => navigate(`/admin/post/${post._id}`)}
//                         >
//                           <Visibility fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Edit">
//                         <IconButton
//                           onClick={() => navigate(`/admin/post/${post._id}`)}
//                         >
//                           <Edit fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton onClick={() => handleDelete(post._id)}>
//                           <Delete fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 50]}
//           component="div"
//           count={posts.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default AllPosts;
