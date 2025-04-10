// src/admin/route/AdminRoutes.jsx

import { Routes, Route } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import AllPosts from "../pages/posts/AllPosts";
import CreatePostPage from "../pages/posts/CreatePost";
import SinglePostView from "../pages/posts/SinglePostView";
import EditPost from "../pages/posts/EditPost";
import AllUsers from "../pages/posts/AllUsers";
import SingleUserView from "../pages/posts/SingleUserView";

// Admin pages

// import EditPost from "../pages/Posts/EditPost";
// import SinglePost from "../pages/Posts/SinglePost";
// import other admin pages as needed

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
         <Route path="post" element={<AllPosts />} />
         <Route path="post/create" element={<CreatePostPage />} />
         <Route path="post/:id" element={<SinglePostView />} />
         <Route path="post/:id" element={<EditPost />} />
         <Route path="/admin/users" element={<AllUsers />} />
         <Route path="/admin/users/:id" element={<SingleUserView />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;
