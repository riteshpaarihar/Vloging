// import {
//     Grid,
//     Paper,
//     Typography,
//     Box,
//     CircularProgress,
//   } from "@mui/material";
//   import {
//     People,
//     Article,
//     Comment,
//     Favorite,
//     Mail,
//     Visibility,
//     Drafts,
//     ReportProblem,
//     Report,
//   } from "@mui/icons-material";
//   import { useSelector, useDispatch } from "react-redux";
//   import { useEffect } from "react";
//   import { fetchStats } from "../../../store/slices/dashboardAnalyticsSlice"; // adjust path if needed
  
//   const statsMeta = [
//     { key: "totalUsers", label: "Total Users", icon: <People />, color: "#1976d2" },
//     { key: "totalPosts", label: "Total Posts", icon: <Article />, color: "#2e7d32" },
//     { key: "totalComments", label: "Total Comments", icon: <Comment />, color: "#ed6c02" },
//     { key: "totalLikes", label: "Total Likes", icon: <Favorite />, color: "#d32f2f" },
//     { key: "totalMessages", label: "Total Messages", icon: <Mail />, color: "#6a1b9a" },
//     { key: "activePosts", label: "Active Posts", icon: <Visibility />, color: "#00796b" },
//     { key: "draftPosts", label: "Draft Posts", icon: <Drafts />, color: "#5d4037" },
//     { key: "reportedComments", label: "Reported Comments", icon: <ReportProblem />, color: "#c62828" },
//     { key: "reportedPosts", label: "Reported Posts", icon: <Report />, color: "#ad1457" },
//   ];
  
//   const StatsSection = () => {
//     const dispatch = useDispatch();
//     const { stats, statsLoading } = useSelector((state) => state.dashboardAnalytics);
  
//     useEffect(() => {
//       dispatch(fetchStats());
//     }, [dispatch]);
  
//     if (statsLoading || !stats) {
//       return (
//         <Box
//           sx={{
//             height: 300,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CircularProgress color="primary" />
//         </Box>
//       );
//     }
  
//     return (
//       <Grid container spacing={2}>
//         {statsMeta.map(({ key, label, icon, color }) => (
//           <Grid key={key} xs={12} sm={6} md={4}>
//             <Paper
//               sx={{
//                 p: 3,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 borderRadius: 3,
//                 backgroundColor: "#f9f9f9",
//                 boxShadow: 3,
//               }}
//             >
//               <Box
//                 sx={{
//                   backgroundColor: color,
//                   color: "#fff",
//                   borderRadius: "50%",
//                   width: 48,
//                   height: 48,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: 24,
//                 }}
//               >
//                 {icon}
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   {label}
//                 </Typography>
//                 <Typography variant="h6" fontWeight={600}>
//                   {stats?.[key] ?? 0}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   };
  
//   export default StatsSection;
  


import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  People,
  Article,
  Comment,
  Favorite,
  Mail,
  Visibility,
  Drafts,
  ReportProblem,
  Report,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchStats } from "../../../store/slices/dashboardAnalyticsSlice";

const statsMeta = [
  { key: "totalUsers", label: "Total Users", icon: <People />, color: "#1976d2", link: "/admin/users" },
  { key: "totalPosts", label: "Total Posts", icon: <Article />, color: "#2e7d32", link: "/admin/post" },
  { key: "totalComments", label: "Total Comments", icon: <Comment />, color: "#ed6c02", link: "/admin/comments" },
  { key: "totalLikes", label: "Total Likes", icon: <Favorite />, color: "#d32f2f" }, // No link
  { key: "totalMessages", label: "Total Messages", icon: <Mail />, color: "#6a1b9a", link: "/admin/messages" },
  { key: "activePosts", label: "Active Posts", icon: <Visibility />, color: "#00796b", link: "/admin/posts?status=active" },
  { key: "draftPosts", label: "Draft Posts", icon: <Drafts />, color: "#5d4037", link: "/admin/posts?status=draft" },
  { key: "reportedComments", label: "Reported Comments", icon: <ReportProblem />, color: "#c62828", link: "/admin/comments?filter=reported" },
  { key: "reportedPosts", label: "Reported Posts", icon: <Report />, color: "#ad1457", link: "/admin/posts?filter=reported" },
];

const StatsSection = () => {
  const dispatch = useDispatch();
  const { stats, statsLoading } = useSelector((state) => state.dashboardAnalytics);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (statsLoading || !stats) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {statsMeta.map(({ key, label, icon, color, link }) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <Box
            component={link ? Link : "div"}
            to={link}
            sx={{
              textDecoration: "none",
              display: "block",
              pointerEvents: link ? "auto" : "none",
            }}
          >
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
                boxShadow: 3,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: link ? "scale(1.02)" : "none",
                  cursor: link ? "pointer" : "default",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: color,
                  color: "#fff",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 24,
                }}
              >
                {icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {label}
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {stats?.[key] ?? 0}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsSection;
