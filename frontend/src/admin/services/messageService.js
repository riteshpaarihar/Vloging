import api from "./api";
import { toast } from "react-toastify";

const getAll = async () => {
  try {
    const res = await api.get("/admin/messages");
    console.log("respose",res.data?.data);
    return res.data?.data;
  } catch (error) {
    toast.error("Failed to fetch messages");
    throw error;
  }
};

const getOne = async (id) => {
  try {
    const res = await api.get(`/admin/messages/${id}`);
    return res.data.data;
  } catch (error) {
    toast.error("Failed to fetch message details");
    throw error;
  }
};

const remove = async (id) => {
  try {
    await api.delete(`/admin/messages/${id}`);
    toast.success("Message deleted successfully");
    return id;
  } catch (error) {
    toast.error("Failed to delete message");
    throw error;
  }
};

const toggleRead = async (id) => {
  try {
    const res = await api.patch(`/admin/messages/${id}/read`);
    toast.success("Message status updated");
    return res.data.data;
  } catch (error) {
    toast.error("Failed to update message status");
    throw error;
  }
};

export default {
  getAll,
  getOne,
  remove,
  toggleRead,
};
