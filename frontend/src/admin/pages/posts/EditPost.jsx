import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Chip,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../../store/slices/adminPostSlice";
import { updatePost } from "../../services/adminPostService";


const EditPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, loading, error } = useSelector((state) => state.posts);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (id) dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        imageUrl: post.imageUrl || "",
        altText: post.altText || "",
        category: post.category || "",
        tags: post.tags || [],
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        metaKeywords: post.metaKeywords || [],
        allowComments: post.allowComments || false,
        isFeatured: post.isFeatured || false,
        isPublished: post.isPublished || false,
        publishAt: post.publishAt || "",
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitch = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleKeywordChange = (e) => {
    const keywords = e.target.value.split(",").map((kw) => kw.trim());
    setFormData((prev) => ({
      ...prev,
      metaKeywords: keywords,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id, data: formData }));
  };

  if (loading || !formData)
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

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Edit Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Slug"
              name="slug"
              fullWidth
              value={formData.slug}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Content"
              name="content"
              fullWidth
              multiline
              minRows={5}
              value={formData.content}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Image URL"
              name="imageUrl"
              fullWidth
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Alt Text"
              name="altText"
              fullWidth
              value={formData.altText}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Category"
              name="category"
              fullWidth
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tags (comma-separated)"
              name="tags"
              fullWidth
              value={formData.tags.join(", ")}
              onChange={handleTagChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Meta Title"
              name="metaTitle"
              fullWidth
              value={formData.metaTitle}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Meta Description"
              name="metaDescription"
              fullWidth
              value={formData.metaDescription}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Meta Keywords (comma-separated)"
              name="metaKeywords"
              fullWidth
              value={formData.metaKeywords.join(", ")}
              onChange={handleKeywordChange}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  name="allowComments"
                  checked={formData.allowComments}
                  onChange={handleSwitch}
                />
              }
              label="Allow Comments"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleSwitch}
                />
              }
              label="Featured"
            />
            <FormControlLabel
              control={
                <Switch
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleSwitch}
                />
              }
              label="Published"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Update Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditPost;
