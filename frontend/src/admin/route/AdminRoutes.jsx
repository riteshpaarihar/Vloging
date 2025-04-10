// src/admin/route/AdminRoutes.jsx

import { Routes, Route } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import AllPosts from "../pages/posts/AllPosts";
import CreatePostPage from "../pages/posts/CreatePost";
import SinglePostView from "../pages/posts/SinglePostView";
import EditPost from "../pages/posts/EditPost";

import AllMessages from "../pages/massages/AllMessages";
import SingleMessage from "../pages/massages/SingleMessage";
import AllUsers from "../pages/users/AllUsers";
import SingleUserView from "../pages/users/SingleUserView";



const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
         <Route path="post" element={<AllPosts />} />
         <Route path="post/create" element={<CreatePostPage />} />
         <Route path="post/:id" element={<SinglePostView />} />
         <Route path="post/:id" element={<EditPost />} />
         <Route path="/admin/users" element={<AllUsers />} />
         <Route path="/admin/users/:id" element={<SingleUserView/>} />
         <Route path="/admin/messages" element={<AllMessages />} />
         <Route path="/admin/messages/:id/read" element={<SingleMessage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
