import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopPosts } from "../../../store/slices/dashboardAnalyticsSlice.js";

import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  useTheme,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";

const TopPostsSection = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const topPosts = useSelector((state) => state.dashboardAnalytics.topPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState("likesCount");

  useEffect(() => {
    dispatch(fetchTopPosts());
  }, [dispatch]);

  // Sort and paginate posts
  const sortedPosts = useMemo(() => {
    return [...topPosts].sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));
  }, [topPosts, sortKey]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2} flexWrap="wrap">
          <Typography variant="h6" fontWeight={600} color="primary">
            Top Performing Posts
          </Typography>

          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortKey}
                label="Sort By"
                onChange={(e) => {
                  setSortKey(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <MenuItem value="likesCount">Likes</MenuItem>
                <MenuItem value="views">Views</MenuItem>
                <MenuItem value="commentsCount">Comments</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Show</InputLabel>
              <Select
                value={postsPerPage}
                label="Show"
                onChange={(e) => {
                  setPostsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[3, 10, 20, 30, 50].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {topPosts.length === 0 ? (
          <Typography textAlign="center" mt={4}>
            No top posts found.
          </Typography>
        ) : (
          <List disablePadding>
            {currentPosts.map((post, index) => (
              <Box key={post._id || index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
                      {indexOfFirstPost + index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {post.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                        <Chip
                          icon={<FavoriteIcon sx={{ color: "red" }} />}
                          label={`${post.likesCount || 0} Likes`}
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          icon={<VisibilityIcon sx={{ color: "blue" }} />}
                          label={`${post.views || 0} Views`}
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          icon={<CommentIcon sx={{ color: "green" }} />}
                          label={`${post.commentsCount || 0} Comments`}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index !== currentPosts.length - 1 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        )}

        {topPosts.length > postsPerPage && (
          <Stack alignItems="center" mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              color="primary"
              shape="rounded"
            />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPostsSection;
