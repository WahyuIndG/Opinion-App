import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TagDropdown from '../components/TagDropdown';
import PostList from '../components/PostList';
import NewCommentModal from '../components/NewCommentModal';
import OpenModalButton from '../components/OpenModalButton';
import { populatePostsAndUsers } from '../states/shared/action';
import { addCommentPostAsyncThunk } from '../states/posts/action';

function HomePage({ toggleDiscussModal }) {
  const [category, setCategory] = useState('');
  const [post, setPost] = useState();
  const [showCommentModal, setShowCommentModal] = useState(false);

  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const postList = posts.map((post) => ({
    ...post,
    owner: users.find((user) => user.id === post.ownerId),
    authUser,
  }));

  useEffect(() => {
    dispatch(populatePostsAndUsers());
  }, [dispatch]);

  const selectHandler = (newCategory) => setCategory(newCategory);

  const filterPost = () => postList.filter((post) => post.category.includes(category));

  const toggleCommentModal = (post) => {
    if (authUser === null) {
      alert('you need to login first');
      return navigate('/login');
    }

    if (post) {
      setPost(post);
    } else {
      setPost(null);
    }
    setShowCommentModal((prev) => !prev);
  };

  const getCategroies = () =>
    posts.reduce((accumulator, post) => {
      if (!accumulator.includes(post.category.toLowerCase())) {
        accumulator.push(post.category.toLowerCase());
      }
      return accumulator;
    }, []);

  return (
    <div>
      <div className="max-[968px]:hidden block">
        <OpenModalButton buttonText="Post" onButtonClicked={toggleDiscussModal}>
          Launch to argue...
        </OpenModalButton>
      </div>
      <PostList posts={filterPost()} onOpenCommentModal={toggleCommentModal} />
      <NewCommentModal
        showModal={showCommentModal}
        post={post}
        onCloseModal={toggleCommentModal}
        actionThunk={addCommentPostAsyncThunk}
      />
      <TagDropdown categories={getCategroies()} selectHandler={selectHandler} selected={category} />
    </div>
  );
}

export default HomePage;
