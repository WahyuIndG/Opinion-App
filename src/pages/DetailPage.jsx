import { useEffect, useState } from 'react';
import CommentList from '../components/CommentList';
import NewCommentModal from '../components/NewCommentModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../components/OpenModalButton';
import { addCommentPostDetailAsyncThunk, receivePostDetailAsyncThunk } from '../states/postDetail/action';
import PostDetailBoard from '../components/PostDetailBoard';

const DetailPage = () => {
  const [commentModal, setCommentModal] = useState();

  const { postId } = useParams();
  const navigate = useNavigate();

  const { postDetail, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receivePostDetailAsyncThunk(postId));
  }, [dispatch, postId]);

  const openCommentModal = () => {
    if (!authUser) {
      alert('login first !');
      return navigate('/login');
    }
    setCommentModal(true);
  };

  const closeCommentModal = () => {
    setCommentModal(false);
  };

  return (
    <>
      <PostDetailBoard postDetail={postDetail} />

      <OpenModalButton
        onButtonClicked={openCommentModal}
        buttonText="Reply"
      >{`Reply to ${postDetail?.owner?.name}`}</OpenModalButton>

      <CommentList comments={postDetail?.comments || []} />

      <NewCommentModal
        showModal={commentModal}
        onCloseModal={closeCommentModal}
        post={postDetail}
        actionThunk={addCommentPostDetailAsyncThunk}
      />
    </>
  );
};

export default DetailPage;