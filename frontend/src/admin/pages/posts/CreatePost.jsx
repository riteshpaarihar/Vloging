

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  Title,
  Link as LinkIcon,
  Image as ImageIcon,
  Tag,
  Description,
} from "@mui/icons-material";

import axios from "axios";
import RichTextEditor from "../../components/RichTextEditor";

const CreatePostPage = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    image: null,
    category: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    isPublished: false,
    isFeatured: false,
    allowComments: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("content", form.content);
      formData.append("image", form.image);
      formData.append("category", form.category);
      formData.append(
        "tags",
        JSON.stringify(form.tags.split(",").map((tag) => tag.trim()))
      );
      formData.append("metaTitle", form.metaTitle);
      formData.append("metaDescription", form.metaDescription);
      formData.append(
        "metaKeywords",
        JSON.stringify(form.metaKeywords.split(",").map((kw) => kw.trim()))
      );
      formData.append("isPublished", form.isPublished);
      formData.append("isFeatured", form.isFeatured);
      formData.append("allowComments", form.allowComments);

      const response = await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post created successfully:", response.data);
      alert("✅ Post published successfully!");
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("❌ Error creating post. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3, background: "#fdfdfd" }}>
      <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
        📝 Create a New Blog Post
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column">
          <TextField
            label="Post Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Slug (URL)"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Content
          </Typography>
          <Paper elevation={0} sx={{ p: 0, mb: 4 }}>
            <RichTextEditor
              value={form.content}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, content: value }))
              }
            />
          </Paper>

          <Box sx={{ mb: 3, mt: 5 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<ImageIcon />}
              sx={{ borderStyle: "dashed", borderColor: "#bbb" }}
            >
              Upload Cover Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {form.image && (
              <Card sx={{ mt: 2, maxWidth: 400 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={URL.createObjectURL(form.image)}
                  alt="Post Preview"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Selected: {form.image.name}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={form.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Lifestyle">Lifestyle</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Fitness">Fitness</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Tags (comma separated)"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tag />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Meta Title (SEO)"
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <TextField
            label="Meta Description (SEO)"
            name="metaDescription"
            value={form.metaDescription}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Meta Keywords (comma separated)"
            name="metaKeywords"
            value={form.metaKeywords}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <FormControlLabel
            control={
              <Switch
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
              />
            }
            label="Publish Now"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />
            }
            label="Feature this Post"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="allowComments"
                checked={form.allowComments}
                onChange={handleChange}
              />
            }
            label="Allow Comments"
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={loading}
            sx={{
              width: "100%",
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {loading ? "Publishing..." : "🚀 Publish Post"}
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default CreatePostPage;
