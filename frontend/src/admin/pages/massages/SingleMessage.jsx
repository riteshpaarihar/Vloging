import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SubjectIcon from "@mui/icons-material/Subject";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MessageIcon from "@mui/icons-material/Message";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMessage, clearSelectedMessage } from "../../store/slices/messageSlice";
import Loader from "../../components/Loader";

const SingleMessage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentMessage, loading } = useSelector((state) => state.adminMessages);

  useEffect(() => {
    dispatch(fetchMessage(id));
    return () => dispatch(clearSelectedMessage());
  }, [id, dispatch]);

  if (loading || !currentMessage) return <Loader />;

  const FieldRow = ({ icon: Icon, label, value, color }) => (
    <Box display="flex" gap={2} alignItems="flex-start" flexWrap="wrap">
      <Icon fontSize="small" color={color || "action"} />
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography
          variant="body1"
          sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Tooltip title="Back to Messages">
        <IconButton onClick={() => navigate("/admin/messages")}>
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

      <Typography variant="h4" fontWeight={600} mt={2} mb={3}>
        Message Details
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Stack spacing={3}>
          <FieldRow icon={PersonIcon} label="Name" value={currentMessage.name} />
          <Divider />
          <FieldRow icon={EmailIcon} label="Email" value={currentMessage.email} />
          <Divider />
          <FieldRow icon={SubjectIcon} label="Subject" value={currentMessage.subject} />
          <Divider />
          <FieldRow
            icon={MarkEmailReadIcon}
            label="Status"
            value={currentMessage.isRead ? "Read" : "Unread"}
            color={currentMessage.isRead ? "success" : "warning"}
          />
          <Divider />
          <FieldRow icon={MessageIcon} label="Message" value={currentMessage.message} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default SingleMessage;
