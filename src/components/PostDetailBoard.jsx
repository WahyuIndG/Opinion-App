import parser from 'html-react-parser';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import timeAgo from '../utils/dateFormatter';
import {
  toggleDownVotePostDetailAsyncThunk,
  toggleUpVotePostDetailAsyncThunk,
} from '../states/postDetail/action';

function PostDetailBoard({ postDetail }) {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = {
    repalce: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'br') {
        return <br />;
      }
    },
  };

  const upVotePostHandler = () => {
    if (!authUser) {
      alert('you need to login first !');
      return navigate('/login');
    }
    dispatch(toggleUpVotePostDetailAsyncThunk());
  };

  const downVotePostHandler = () => {
    if (!authUser) {
      alert('you need to login first !');
      return navigate('/login');
    }
    dispatch(toggleDownVotePostDetailAsyncThunk());
  };

  return (
    <div className="pt-3 pb-6">
      <header className="flex items-center">
        <img src={postDetail?.owner?.avatar} alt="avatar" className="w-11 h-11 rounded-full" />
        <p className="ml-3 font-medium ">{postDetail?.owner?.name}</p>
        <span className="ml-auto text-sm text-dkinactive">{timeAgo(postDetail?.createdAt)}</span>
      </header>
      <main className="mt-4">
        <h2 className="text-xl font-semibold">{postDetail?.title}</h2>
        <div className="text-sm font-light mt-2">{parser(postDetail?.body || '', options)}</div>
        <span className="inline-block mt-4  bg-dkSecondary text-[#757576] text-sm p-2 px-3 rounded-lg">
          #{postDetail?.category?.toLowerCase()}
        </span>
      </main>
      <footer className="flex justify-between mt-4">
        <div className="flex gap-3">
          <button
            onClick={upVotePostHandler}
            className="flex justify-center items-center gap-[4px] py-2 px-2 rounded-xl hover:bg-dkSecondary"
          >
            {postDetail?.upVotesBy.includes(authUser?.id) ? (
              <BiSolidLike className="text-[#D7D7D7] text-[26px]" />
            ) : (
              <BiLike className="text-[#D7D7D7] text-[26px]" />
            )}
            <span className="text-[#D7D7D7] text-sm">{postDetail?.upVotesBy?.length}</span>
          </button>
          <button
            onClick={downVotePostHandler}
            className="flex justify-center items-center gap-[4px] py-2 px-2 rounded-xl hover:bg-dkSecondary "
          >
            {postDetail?.downVotesBy.includes(authUser?.id) ? (
              <BiSolidDislike className="text-[#D7D7D7] text-[26px]" />
            ) : (
              <BiDislike className="text-[#D7D7D7] text-[26px]" />
            )}
            <span className="text-[#D7D7D7] text-sm">{postDetail?.downVotesBy?.length}</span>
          </button>
          <span className="flex justify-center items-center gap-[4px] py-2 px-2 ">
            <FaRegCommentDots className="text-[#D7D7D7] text-[22px]" />
            <span className="text-[#D7D7D7] text-sm">{postDetail?.comments?.length}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default PostDetailBoard;
