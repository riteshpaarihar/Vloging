// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Box, Typography, Paper } from "@mui/material";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["blockquote", "code-block"],
//     [{ script: "sub" }, { script: "super" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ align: [] }],
//     [{ color: [] }, { background: [] }],
//     ["clean"],
//   ],
// };

// const formats = [
//   "header", "bold", "italic", "underline", "strike",
//   "list", "bullet", "blockquote", "code-block",
//   "script", "indent", "align", "color", "background",
// ];

// const RichTextEditor = ({ value, onChange }) => {
//   const getCharCount = (html) => html.replace(/<[^>]+>/g, "").length;

//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         borderRadius: 2,
//         overflow: "hidden",
//         border: "1px solid #e0e0e0",
//         mb: 2,
//       }}
//     >
//       <Box
//         sx={{
//           ".ql-toolbar": {
//             backgroundColor: "#fafafa",
//             borderBottom: "1px solid #e0e0e0",
//             px: 2,
//           },
//           ".ql-container": {
//             minHeight: "250px",
//             fontFamily: "inherit",
//             fontSize: "1rem",
//             border: "none",
//             px: 2,
//             py: 1,
//           },
//         }}
//       >
//         <ReactQuill
//           theme="snow"
//           value={value}
//           onChange={onChange}
//           modules={modules}
//           formats={formats}
//         />
//       </Box>

//       <Box px={2} py={1} textAlign="right" bgcolor="#f9f9f9" borderTop="1px solid #e0e0e0">
//         <Typography variant="caption" color="text.secondary">
//           Character Count: {getCharCount(value)}
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// export default RichTextEditor;



import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Collapse,
} from "@mui/material";

// Quill editor toolbar configuration
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

// Helper: Convert HTML to plain text
const getPlainText = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent.replace(/\uFEFF/g, "").trim();
};

// Helper: Word count
const getWordCount = (text) =>
  text.trim().split(/\s+/).filter(Boolean).length;

const RichTextEditor = ({ value, onChange }) => {
  const [showHtml, setShowHtml] = useState(false);

  const plainText = getPlainText(value);
  const wordCount = getWordCount(plainText);

  const handleReset = () => onChange("");

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
      {/* Toolbar and Editor */}
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

      {/* Actions */}
      <Box
        px={2}
        py={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#f9f9f9"
        borderTop="1px solid #e0e0e0"
        gap={2}
        flexWrap="wrap"
      >
        <Box display="flex" gap={2}>
          <Typography variant="caption" color="text.secondary">
            Characters: {plainText.length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Words: {wordCount}
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <Button size="small" variant="outlined" onClick={handleReset}>
            Reset
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => setShowHtml((prev) => !prev)}
          >
            {showHtml ? "Hide HTML" : "Preview HTML"}
          </Button>
        </Box>
      </Box>

      {/* HTML Preview */}
      <Collapse in={showHtml}>
        <Divider />
        <Box px={2} py={1} sx={{ fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>
          <Typography variant="subtitle2" gutterBottom>
            HTML Output:
          </Typography>
          <Box
            sx={{
              fontFamily: "monospace",
              backgroundColor: "#f5f5f5",
              p: 2,
              borderRadius: 1,
              overflowX: "auto",
              maxHeight: "200px",
            }}
          >
            {value || "<empty>"}
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default RichTextEditor;
