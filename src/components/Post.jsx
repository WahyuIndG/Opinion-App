/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import parser from 'html-react-parser';
import { FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import timeAgo from '../utils/dateFormatter';
import { toggleDownVoteAsyncThunk, toggleUpVoteAsyncThunk } from '../states/posts/action';

function Post({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  authUser,
  upVotesBy,
  downVotesBy,
  totalComments,
  onOpenCommentModal,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onPostClickedHandler() {
    navigate(`/post/${id}`);
  }

  function onLike(e) {
    e.stopPropagation();
    if (!authUser) {
      alert('you need to login first !');
      return navigate('/login');
    }
    dispatch(toggleUpVoteAsyncThunk(id));
  }
  function onUnlike(e) {
    e.stopPropagation();
    if (!authUser) {
      alert('you need to login first !');
      return navigate('/login');
    }
    dispatch(toggleDownVoteAsyncThunk(id));
  }
  function onComment(e) {
    e.stopPropagation();
    if (!authUser) {
      alert('you need to login first !');
      return navigate('/login');
    }
    onOpenCommentModal({ id, owner });
  }

  const options = {
    repalce: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'br') {
        return <br />;
      }
    },
  };

  return (
    <div
      className="flex justify-start pt-[14px] pb-[20px] gap-[12px] border-b border-dkinactive"
      onClick={onPostClickedHandler}
    >
      <img src={owner?.avatar} className="w-[38px] h-[38px] rounded-full" alt="c" title="image" />
      <section className="flex-grow flex flex-col">
        <header className="h-[40px] flex justify-between items-center">
          <h2 className="text-sm font-medium">{owner?.name}</h2>
          <span className="text-xs text-[#757576]">{timeAgo(createdAt || '')}</span>
        </header>
        <main className="flex flex-col pt-1 pb-5">
          <h1 className="font-semibold">{title}</h1>
          <div className="text-sm font-light mt-1">{parser(body, options)}</div>
        </main>
        <footer className="flex justify-between">
          <div className="flex gap-4">
            <button
              onClick={onLike}
              className="widget flex justify-center items-center gap-[4px] py-1 px-2 rounded-xl hover:bg-dkSecondary"
            >
              {upVotesBy?.includes(authUser?.id) ? (
                <BiSolidLike className="text-[22px]" />
              ) : (
                <BiLike className="text-[22px]" />
              )}
              <span className="text-sm">{upVotesBy?.length}</span>
            </button>
            <button
              onClick={onUnlike}
              className="widget flex justify-center items-center gap-[4px] py-1 px-2 rounded-xl hover:bg-dkSecondary"
            >
              {downVotesBy?.includes(authUser?.id) ? (
                <BiSolidDislike className="text-[22px]" />
              ) : (
                <BiDislike className="text-[22px]" />
              )}
              <span className="text-sm">{downVotesBy?.length}</span>
            </button>
            <button
              onClick={onComment}
              className="widget flex justify-center items-center gap-[4px] py-1 px-2 rounded-xl hover:bg-dkSecondary"
            >
              <FaRegCommentDots className="text-[20px]" />
              <span className="text-sm">{totalComments}</span>
            </button>
          </div>
          <span className="text-[12px] font-medium bg-dkSecondary text-[#777] flex justify-center items-center rounded-md px-2">
            #{category}
          </span>
        </footer>
      </section>
    </div>
  );
}

export default Post;
