import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography, Paper } from "@mui/material";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header", "bold", "italic", "underline", "strike",
  "list", "bullet", "blockquote", "code-block",
  "script", "indent", "align", "color", "background",
];

const RichTextEditor = ({ value, onChange }) => {
  const getCharCount = (html) => html.replace(/<[^>]+>/g, "").length;

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        mb: 2,
      }}
    >
      <Box
        sx={{
          ".ql-toolbar": {
            backgroundColor: "#fafafa",
            borderBottom: "1px solid #e0e0e0",
            px: 2,
          },
          ".ql-container": {
            minHeight: "250px",
            fontFamily: "inherit",
            fontSize: "1rem",
            border: "none",
            px: 2,
            py: 1,
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
        />
      </Box>

      <Box px={2} py={1} textAlign="right" bgcolor="#f9f9f9" borderTop="1px solid #e0e0e0">
        <Typography variant="caption" color="text.secondary">
          Character Count: {getCharCount(value)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default RichTextEditor;
