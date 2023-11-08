import React from 'react';
import Post from './Post';

const PostList = ({ onOpenCommentModal, posts }) => {
  return (
    <ul className="pb-32">
      {posts.map((post) => (
        <li key={post.id} className="hover:cursor-pointer">
          <Post {...post} onOpenCommentModal={onOpenCommentModal} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
