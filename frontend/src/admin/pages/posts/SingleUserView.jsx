import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { fetchUser } from "../../store/slices/adminUserSlice";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../components/Loader";

const SingleUserView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedUser, loading, error } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    if (id) dispatch(fetchUser(id));
  }, [id, dispatch]);

  // Loading Spinner Centered
  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) return <Typography color="error" m={2}>Error: {error}</Typography>;
  if (!selectedUser) return <Typography m={2}>User not found</Typography>;

  const {
    username,
    email,
    firstName,
    lastName,
    mobileNumber,
    profileImage,
    role,
    isVerified,
    createdAt,
    updatedAt,
  } = selectedUser;

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>User Profile</Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <Avatar
              alt={username}
              src={profileImage || "/default-avatar.png"}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>User Details</Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>First Name:</strong> {firstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Last Name:</strong> {lastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Username:</strong> {username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Email:</strong> {email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Mobile Number:</strong> {mobileNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Role:</strong> {role}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Status:</strong>{" "}
                  <Chip
                    label={isVerified ? "Verified" : "Not Verified"}
                    color={isVerified ? "success" : "warning"}
                    icon={isVerified ? <VerifiedIcon /> : <CancelIcon />}
                    variant="outlined"
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SingleUserView;
