import React from 'react';
import parser from 'html-react-parser';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import timeAgo from '../utils/dateFormatter';
import {
  toggleDownVoteCommentAsyncThunk,
  toggleUpVoteCommentAsyncThunk,
} from '../states/postDetail/action';

function Comment({ id, content, owner, upVotesBy, downVotesBy, createdAt }) {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const options = {
    repalce: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'br') {
        return <br />;
      }
    },
  };

  const upVoteHandler = () => dispatch(toggleUpVoteCommentAsyncThunk(id));

  const downVoteHandler = () => dispatch(toggleDownVoteCommentAsyncThunk(id));

  return (
    <div className="flex justify-start pt-[14px] pb-[20px] gap-[12px] border-b border-dkinactive">
      <div className="w-[38px]">
        <img
          className="w-[38px] h-[38px] rounded-full"
          src={owner?.avatar}
          alt="avatar"
          title="image"
        />
      </div>

      <section className="flex-grow flex flex-col">
        <header className="h-[40px] flex justify-between items-center">
          <h2 className="text-sm font-medium">{owner?.name}</h2>
          <span className="text-xs text-[#757576]">{timeAgo(createdAt)}</span>
        </header>

        <main className="flex flex-col pt-1 pb-2">
          <div className="text-sm mt-1 font-light">{parser(content || '', options)}</div>
        </main>

        <footer className="flex justify-between">
          <div className="flex gap-2">
            <button
              onClick={upVoteHandler}
              className="flex justify-center items-center gap-[4px] py-1 px-2 rounded-xl hover:bg-dkSecondary"
            >
              {upVotesBy.includes(authUser?.id) ? (
                <BiSolidLike className="text-[22px]" />
              ) : (
                <BiLike className="text-[22px]" />
              )}
              <span className="text-sm">{upVotesBy?.length}</span>
            </button>
            <button
              onClick={downVoteHandler}
              className="flex justify-center items-center gap-[4px] py-1 px-2 rounded-xl hover:bg-dkSecondary"
            >
              {downVotesBy.includes(authUser?.id) ? (
                <BiSolidDislike className="text-[22px]" />
              ) : (
                <BiDislike className="text-[22px]" />
              )}
              <span className="text-sm">{downVotesBy?.length}</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Comment;
