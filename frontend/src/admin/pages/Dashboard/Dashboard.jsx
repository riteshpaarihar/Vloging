import {
    Tabs,
    Tab,
    Box,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { useState } from "react";
  import {
    BarChart,
    InsertChart,
    PersonAdd,
    Star,
    Category,
  } from "@mui/icons-material";
  
  import StatsSection from "./sections/StatsSection";
  import PostAnalyticsSection from "./sections/PostAnalyticsSection";
  import SignupAnalyticsSection from "./sections/SignupAnalyticsSection";
  import TopPostsSection from "./sections/TopPostsSection";
  import CategoryPopularitySection from "./sections/CategoryPopularitySection";
  
  const Dashboard = () => {
    const [tab, setTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    const handleChange = (_, newValue) => {
      setTab(newValue);
    };
  
    const renderTabPanel = () => {
      switch (tab) {
        case 0:
          return <StatsSection />;
        case 1:
          return <PostAnalyticsSection />;
        case 2:
          return <SignupAnalyticsSection />;
        case 3:
          return <TopPostsSection />;
        case 4:
          return <CategoryPopularitySection />;
        default:
          return null;
      }
    };
  
    return (
      <Box
        sx={{
          p: { xs: 1, sm: 3 },
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={3} color="primary">
            Admin Dashboard
          </Typography>
  
          <Tabs
            value={tab}
            onChange={handleChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            textColor="primary"
            indicatorColor="primary"
            aria-label="Dashboard Tabs"
            sx={{
              mb: 3,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Tab icon={<BarChart />} label="Stats" iconPosition="start" />
            <Tab icon={<InsertChart />} label="Post Analytics" iconPosition="start" />
            <Tab icon={<PersonAdd />} label="Signup Analytics" iconPosition="start" />
            <Tab icon={<Star />} label="Top Posts" iconPosition="start" />
            <Tab icon={<Category />} label="Category Popularity" iconPosition="start" />
          </Tabs>
  
          <Box>{renderTabPanel()}</Box>
        </Paper>
      </Box>
    );
  };
  
  export default Dashboard;
  