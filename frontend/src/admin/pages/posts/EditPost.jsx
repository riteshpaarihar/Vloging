// import React, { useEffect, useState } from 'react';
// import {
//   TextField, Button, Grid, Typography, Switch,
//   FormControlLabel, Card, CardMedia
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchSinglePost, updateAdminPost } from '../../store/slices/adminPostSlice';
// import { toast } from 'react-toastify';

// const EditPost = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const postState = useSelector(state => state.posts) || {};
//   const {
//     post: singlePost,
//     loading,
//     error,
//     success: updateSuccess
//   } = postState;

//   const [postData, setPostData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     tags: '',
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: '',
//     readingTime: '',
//     allowComments: false,
//     isFeatured: false,
//     isPublished: false,
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     dispatch(fetchSinglePost(id));
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (singlePost) {
//       setPostData({
//         title: singlePost.title || '',
//         content: singlePost.content || '',
//         category: singlePost.category || '',
//         tags: singlePost.tags?.join(', ') || '',
//         metaTitle: singlePost.metaTitle || '',
//         metaDescription: singlePost.metaDescription || '',
//         metaKeywords: singlePost.metaKeywords?.join(', ') || '',
//         readingTime: singlePost.readingTime || '',
//         allowComments: singlePost.allowComments || false,
//         isFeatured: singlePost.isFeatured || false,
//         isPublished: singlePost.isPublished || false,
//       });
//       setImagePreview(singlePost.imageUrl || '');
//     }
//   }, [singlePost]);

//   useEffect(() => {
//     if (updateSuccess) {
//       toast.success('Post updated successfully!');
//       navigate('/admin/posts');
//     } else if (error) {
//       toast.error('Failed to update post');
//     }
//   }, [updateSuccess, error, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPostData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const parseToArray = (str) => str.split(',').map(s => s.trim()).filter(Boolean);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     Object.entries(postData).forEach(([key, val]) => {
//       formData.append(key, val);
//     });

//     formData.set('tags', JSON.stringify(parseToArray(postData.tags)));
//     formData.set('metaKeywords', JSON.stringify(parseToArray(postData.metaKeywords)));

//     if (imageFile) {
//       formData.append('imageUrl', imageFile);
//     }

//     dispatch(updateAdminPost({ id, data: formData }));
//   };

//   if (loading) return <Typography>Loading post...</Typography>;
//   if (error && !singlePost) return <Typography>Error loading post.</Typography>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <Typography variant="h4" gutterBottom>Edit Post</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <TextField fullWidth label="Title" name="title" value={postData.title} onChange={handleChange} />
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <TextField
//             fullWidth multiline rows={4}
//             label="Content" name="content"
//             value={postData.content} onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <TextField fullWidth label="Category" name="category" value={postData.category} onChange={handleChange} />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <TextField fullWidth label="Tags (comma separated)" name="tags" value={postData.tags} onChange={handleChange} />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <TextField fullWidth label="Meta Title" name="metaTitle" value={postData.metaTitle} onChange={handleChange} />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField fullWidth label="Meta Description" name="metaDescription" value={postData.metaDescription} onChange={handleChange} />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField fullWidth label="Meta Keywords" name="metaKeywords" value={postData.metaKeywords} onChange={handleChange} />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <TextField fullWidth label="Reading Time (mins)" name="readingTime" value={postData.readingTime} onChange={handleChange} />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <FormControlLabel
//             control={<Switch name="allowComments" checked={postData.allowComments} onChange={handleChange} />}
//             label="Allow Comments"
//           />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <FormControlLabel
//             control={<Switch name="isFeatured" checked={postData.isFeatured} onChange={handleChange} />}
//             label="Featured"
//           />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <FormControlLabel
//             control={<Switch name="isPublished" checked={postData.isPublished} onChange={handleChange} />}
//             label="Published"
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Button variant="contained" component="label">
//             Upload Cover Image
//             <input type="file" hidden accept="image/*" onChange={handleFileChange} />
//           </Button>
//           {imagePreview && (
//             <Card sx={{ mt: 2, maxWidth: 300 }}>
//               <CardMedia component="img" height="200" image={imagePreview} alt="Cover Preview" />
//             </Card>
//           )}
//         </Grid>

//         <Grid item xs={12}>
//           <Button variant="contained" color="primary" type="submit">Update Post</Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default EditPost;

// src/admin/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSinglePost,
  resetUpdateStatus,
  updateAdminPost,
} from "../../store/slices/adminPostSlice";
import RichTextEditor from "../../components/RichTextEditor";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";

const categories = ["Travel", "Tech", "Fitness", "Lifestyle", "Food"];

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const { post: singlePost, loading, error, success: updateSuccess } =
   // useSelector((state) => state.posts);
const { post: singlePost, loading, error, success: updateSuccess } = useSelector((state) => state.posts);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    readingTime: "",
    allowComments: false,
    isFeatured: false,
    isPublished: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (singlePost) {
      setPostData({
        title: singlePost.title || "",
        content: singlePost.content || "",
        category: singlePost.category || "",
        tags: singlePost.tags?.join(", ") || "",
        metaTitle: singlePost.metaTitle || "",
        metaDescription: singlePost.metaDescription || "",
        metaKeywords: singlePost.metaKeywords?.join(", ") || "",
        readingTime: singlePost.readingTime || "",
        allowComments: singlePost.allowComments || false,
        isFeatured: singlePost.isFeatured || false,
        isPublished: singlePost.isPublished || false,
      });
      setImagePreview(singlePost.imageUrl || "");
    }
  }, [singlePost]);

  // useEffect(() => {
  //   if (updateSuccess) {
  //     toast.success("Post updated successfully!");
  //     navigate("/admin/post");
  //   } else if (error) {
  //     toast.error("Failed to update post");
  //   }
  // }, [updateSuccess, error, navigate]);

useEffect(() => {
  if (updateSuccess) {
    toast.success("Post updated successfully!");
    dispatch(resetUpdateStatus());
    navigate("/admin/post");
  } else if (error) {
    toast.error("Failed to update post");
    dispatch(resetUpdateStatus());
  }
}, [updateSuccess, error, dispatch, navigate]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const parseCommaSeparated = (value) =>
    value.split(",").map((s) => s.trim()).filter(Boolean);

  const handleSubmit = (e) => {
  e.preventDefault();
  const tagsArray = parseCommaSeparated(postData.tags);
  const metaKeywordsArray = parseCommaSeparated(postData.metaKeywords);

  const formData = new FormData();
  Object.entries(postData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.set("tags", JSON.stringify(tagsArray));
  formData.set("metaKeywords", JSON.stringify(metaKeywordsArray));

  if (imageFile) {
    formData.append("imageUrl", imageFile);
  }

  // Log all FormData key-values
  console.log("FormData content:");
  for (const pair of formData.entries()) {
    if (pair[1] instanceof File) {
      console.log(`${pair[0]}: File - ${pair[1].name}, size: ${pair[1].size}`);
    } else {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  }

  dispatch(updateAdminPost({ id, data: formData }));
};


  return (
    <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3, background: "#fdfdfd" }}>
      <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
        ✏️ Edit Blog Post
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

          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<ImageIcon />}
              sx={{ borderStyle: "dashed", borderColor: "#bbb" }}
            >
              Upload Cover Image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {imagePreview && (
              <Card sx={{ mt: 2, maxWidth: 400 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={imagePreview}
                  alt="Post Preview"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {imageFile?.name || "Current Image"}
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

          <TextField
            label="Reading Time (mins)"
            name="readingTime"
            value={postData.readingTime}
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
            {loading ? <CircularProgress size={24} /> : "💾 Update Post"}
          </Button>
        </Box>
      </form>
    </Card>
  );
}
