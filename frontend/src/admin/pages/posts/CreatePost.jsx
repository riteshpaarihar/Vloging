

import React, { useState, useEffect } from "react";
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
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Title,
  Image as ImageIcon,
  Tag,
  Description,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createAdminPost, resetCreateStatus } from "../../store/slices/adminPostSlice";
import RichTextEditor from "../../components/RichTextEditor";
import Checkbox from "@mui/material/Checkbox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = ["Travel", "Tech", "Fitness", "Lifestyle", "Food"];

export default function CreatePost() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.posts);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    readingTime: "",
    allowComments: true,
    isFeatured: false,
    isPublished: true,
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData({
      ...postData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const parseCommaSeparated = (value) =>
    value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = parseCommaSeparated(postData.tags);
    const metaKeywordsArray = parseCommaSeparated(postData.metaKeywords);

    // if (tagsArray.length === 0) {
    //   toast.warn("Please add at least one tag.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("category", postData.category);
    formData.append("metaTitle", postData.metaTitle);
    formData.append("metaDescription", postData.metaDescription);
    formData.append("readingTime", postData.readingTime);
    formData.append("allowComments", postData.allowComments);
    formData.append("isFeatured", postData.isFeatured);
    formData.append("isPublished", postData.isPublished);
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("metaKeywords", JSON.stringify(metaKeywordsArray));

    if (imageFile) {
      formData.append("imageUrl", imageFile);
    }

    dispatch(createAdminPost(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success("Post Created Successfully!");
      setPostData({
        title: "",
        content: "",
        category: "",
        tags: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        readingTime: "",
        allowComments: true,
        isFeatured: false,
        isPublished: true,
      });
      setImageFile(null);
      dispatch(resetCreateStatus());
    }

    if (error) {
      toast.error(error || "Something went wrong!");
      dispatch(resetCreateStatus());
    }
  }, [success, error, dispatch]);

  return (
    <>
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
              value={postData.title}
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

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Content
            </Typography>
            <Paper elevation={0} sx={{ p: 0, mb: 4 }}>
              <RichTextEditor
                value={postData.content}
                onChange={(value) =>
                  setPostData((prev) => ({ ...prev, content: value }))
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
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {imageFile && (
                <Card sx={{ mt: 2, maxWidth: 400 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={URL.createObjectURL(imageFile)}
                    alt="Post Preview"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Selected: {imageFile.name}
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
                value={postData.category}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Tags (comma separated)"
              name="tags"
              value={postData.tags}
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
            <Box mt={1}>
              {parseCommaSeparated(postData.tags).map((tag, index) => (
                <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>

            <TextField
              label="Meta Title (SEO)"
              name="metaTitle"
              value={postData.metaTitle}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <TextField
              label="Meta Description (SEO)"
              name="metaDescription"
              value={postData.metaDescription}
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
              value={postData.metaKeywords}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <FormControlLabel
              control={
                <Switch
                  name="isPublished"
                  checked={postData.isPublished}
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
                  checked={postData.isFeatured}
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
                  checked={postData.allowComments}
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
              {loading ? <CircularProgress size={24} /> : "🚀 Publish Post"}
            </Button>
          </Box>
        </form>
      </Card>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}
