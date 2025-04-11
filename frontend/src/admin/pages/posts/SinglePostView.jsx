
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePost } from "../../store/slices/adminPostSlice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
} from "@mui/material";
import {
  ArrowBack,
  Visibility,
  ThumbUp,
  Comment,
  Category,
  Label,
  Verified,
  Public,
  Update,
} from "@mui/icons-material";

const InfoItem = ({ icon: Icon, label, value }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Icon fontSize="small" color="action" />
    <Typography variant="body2">
      <strong>{label}:</strong> {value}
    </Typography>
  </Stack>
);

const SinglePostView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <Box p={3} maxWidth="1200px" mx="auto">
      {/* Back Button */}
      <Box mb={3} display="flex" alignItems="center">
        <Tooltip title="Go Back">
          <IconButton onClick={() => navigate(-1)} size="large">
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" fontWeight={600} ml={1}>
          Post Overview
        </Typography>
      </Box>

      {/* Post Header */}
      <Box
        bgcolor="linear-gradient(to right, #1e3c72, #2a5298)"
        color="#fff"
        p={3}
        borderRadius="16px"
        mb={3}
        boxShadow={3}
        sx={{
          background: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          {post.title}
        </Typography>
        <Typography variant="subtitle2" opacity={0.8}>
          Slug: {post.slug}
        </Typography>
      </Box>

      <Card elevation={4}>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.altText || "Post Image"}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
        )}
        <CardContent>
          {/* Content */}
          <Typography variant="body1" paragraph>
            {post.content || "No content available."}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Tags and Category */}
          <Stack direction="row" spacing={2} flexWrap="wrap" mb={3}>
            <Chip
              label={post.category || "Uncategorized"}
              icon={<Category />}
              color="primary"
              variant="filled"
            />
            {Array.isArray(post.tags) &&
              post.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  icon={<Label />}
                  variant="outlined"
                />
              ))}
          </Stack>

          {/* Stats */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem icon={Visibility} label="Views" value={post.views} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem icon={ThumbUp} label="Likes" value={post.likeCount} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem icon={Comment} label="Comments" value={post.commentCount} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem
                icon={Public}
                label="Published"
                value={post.isPublished ? "Yes" : "No"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem
                icon={Verified}
                label="Featured"
                value={post.isFeatured ? "Yes" : "No"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem
                icon={Comment}
                label="Allow Comments"
                value={post.allowComments ? "Yes" : "No"}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Meta Details */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              SEO Metadata
            </Typography>
            <Typography variant="body2">
              <strong>Meta Title:</strong> {post.metaTitle || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Meta Description:</strong> {post.metaDescription || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Meta Keywords:</strong>{" "}
              {Array.isArray(post.metaKeywords)
                ? post.metaKeywords.join(", ")
                : "N/A"}
            </Typography>
          </Box>

          {/* Timestamps */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={Update}
                label="Created At"
                value={new Date(post.createdAt).toLocaleString()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem
                icon={Update}
                label="Updated At"
                value={new Date(post.updatedAt).toLocaleString()}
              />
            </Grid>
          </Grid>

          {/* Author Info */}
          <Box mt={4}>
            <Typography variant="caption" color="text.secondary">
              Created by: {post.createdBy || "Unknown User"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SinglePostView;
