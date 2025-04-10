import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../../store/slices/adminPostSlice";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";

const SinglePostView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (id) dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box mt={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!post || typeof post !== "object")
    return (
      <Box mt={5}>
        <Alert severity="warning">No post found or invalid data.</Alert>
      </Box>
    );

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Card elevation={3}>
        {post.imageUrl && (
          <CardMedia
            component="img"
            image={post.imageUrl}
            alt={post.altText || "Post image"}
            height="400"
            sx={{ objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {post.title || "Untitled Post"}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            <strong>Slug:</strong> {post.slug}
          </Typography>

          <Typography variant="body1" paragraph>
            {post.content || "No content available."}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
            <Chip label={post.category || "Uncategorized"} color="primary" />
            {Array.isArray(post.tags) &&
              post.tags.map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
              ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Views:</strong> {post.views}
              </Typography>
              <Typography variant="body2">
                <strong>Likes:</strong> {post.likeCount}
              </Typography>
              <Typography variant="body2">
                <strong>Comments:</strong> {post.commentCount}
              </Typography>
              <Typography variant="body2">
                <strong>Allow Comments:</strong> {post.allowComments ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Is Featured:</strong> {post.isFeatured ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Is Published:</strong> {post.isPublished ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            <strong>Meta Title:</strong> {post.metaTitle || "N/A"}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            <strong>Meta Description:</strong> {post.metaDescription || "N/A"}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            <strong>Meta Keywords:</strong>{" "}
            {Array.isArray(post.metaKeywords)
              ? post.metaKeywords.join(", ")
              : "N/A"}
          </Typography>

          <Typography variant="caption" color="text.secondary" display="block" mt={2}>
            Created by: {post.createdBy || "Unknown User"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SinglePostView;
