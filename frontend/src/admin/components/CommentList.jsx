import React from 'react';

const CommentList = ({ comments }) => {
  if (!Array.isArray(comments)) {
    return <p>No comments available.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <p><strong>Author:</strong> {comment.user?.firstName} {comment.user?.lastName}</p>
          <p><strong>Post Title:</strong> {comment.post?.title}</p>
          <p><strong>Comment:</strong> {comment.text}</p>
          <p><strong>Likes:</strong> {comment.likeCount}</p>
          <p><strong>Replies:</strong> {comment.replyCount}</p>
          <p><em>Posted on: {new Date(comment.createdAt).toLocaleString()}</em></p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
