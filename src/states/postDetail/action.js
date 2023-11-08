import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axios, { getAccessToken } from '../../utils/api';

export const ActionType = {
  RECEIVE_POST_DETAIL: 'RECEIVE_POST_DETAIL',
  CLEAR_POST_DETAIL: 'CLEAR_POST_DETAIL',
  UPDATE_POST_DETAIL: 'UPDATE_POST_DETAIL',
  ADD_COMMENT_POST_DETAIL: 'ADD_COMMENT_POST_DETAIL',
};

export function receivePostDetailActionCreator(postDetail) {
  return {
    type: ActionType.RECEIVE_POST_DETAIL,
    payload: {
      postDetail,
    },
  };
}

export function clearPostDetailActionCreator() {
  return {
    type: ActionType.CLEAR_POST_DETAIL,
    payload: {
      postDetail: null,
    },
  };
}

export function updatePostDetailActionCreator(postDetail) {
  return {
    type: ActionType.UPDATE_POST_DETAIL,
    payload: {
      postDetail,
    },
  };
}

export function addCommentPostDetailActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_POST_DETAIL,
    payload: {
      comment,
    },
  };
}

export function receivePostDetailAsyncThunk(postId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      dispatch(clearPostDetailActionCreator());

      const response = await axios.get(`/threads/${postId}`);

      dispatch(receivePostDetailActionCreator(response.data.data.detailThread));
    } catch (error) {
      console.error(error);
    }

    dispatch(hideLoading());
  };
}

export function toggleUpVotePostDetailAsyncThunk() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { postDetail, authUser } = getState();
    const isUpVoted = postDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = postDetail.downVotesBy.includes(authUser.id);

    if (isUpVoted) {
      const upVotesBy = postDetail.upVotesBy.filter((userId) => userId !== authUser.id);
      dispatch(updatePostDetailActionCreator({ ...postDetail, upVotesBy }));

      axios
        .post(`/threads/${postDetail.id}/neutral-vote`, null, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    } else {
      if (isDownVoted) {
        const upVotesBy = [...postDetail.upVotesBy, authUser.id];
        const downVotesBy = postDetail.downVotesBy.filter((userId) => userId !== authUser.id);
        dispatch(updatePostDetailActionCreator({ ...postDetail, upVotesBy, downVotesBy }));
      } else {
        const upVotesBy = [...postDetail.upVotesBy, authUser.id];
        dispatch(updatePostDetailActionCreator({ ...postDetail, upVotesBy }));
      }

      axios
        .post(`/threads/${postDetail.id}/up-vote`, null, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    }
    dispatch(hideLoading());
  };
}

export function toggleDownVotePostDetailAsyncThunk() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { postDetail, authUser } = getState();
    const isUpVoted = postDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = postDetail.downVotesBy.includes(authUser.id);

    if (isDownVoted) {
      const downVotesBy = postDetail.downVotesBy.filter((userId) => userId !== authUser.id);
      dispatch(updatePostDetailActionCreator({ ...postDetail, downVotesBy }));

      axios
        .post(`/threads/${postDetail.id}/neutral-vote`, null, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    } else {
      if (isUpVoted) {
        const downVotesBy = [...postDetail.downVotesBy, authUser.id];
        const upVotesBy = postDetail.upVotesBy.filter((userId) => userId !== authUser.id);
        dispatch(updatePostDetailActionCreator({ ...postDetail, upVotesBy, downVotesBy }));
      } else {
        const downVotesBy = [...postDetail.downVotesBy, authUser.id];
        dispatch(updatePostDetailActionCreator({ ...postDetail, downVotesBy }));
      }

      axios
        .post(`/threads/${postDetail.id}/down-vote`, null, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    }

    dispatch(hideLoading());
  };
}

export function addCommentPostDetailAsyncThunk(postId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await axios.post(`/threads/${postId}/comments`, JSON.stringify({ content }), {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAccessToken()}` },
      });

      dispatch(addCommentPostDetailActionCreator(response.data.data.comment));
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message);
    }

    dispatch(hideLoading());
  };
}

// up and down vote comment

export function toggleUpVoteCommentAsyncThunk(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, postDetail } = getState();
    const comment = postDetail.comments.find((comment) => comment.id === commentId);

    const isUpVotedComment = comment.upVotesBy.includes(authUser.id);
    const isDownVotedComment = comment.downVotesBy.includes(authUser.id);

    if (isUpVotedComment) {
      const upVotesBy = comment.upVotesBy.filter((userId) => userId !== authUser.id);
      const newComments = postDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, upVotesBy };
        }
        return comment;
      });

      dispatch(updatePostDetailActionCreator({ ...postDetail, comments: newComments }));

      axios
        .post(
          `/threads/${postDetail.id}/comments/${commentId}/neutral-vote
        `,
          null,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        )
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    } else {
      if (isDownVotedComment) {
        const upVotesBy = [...comment.upVotesBy, authUser.id];
        const downVotesBy = comment.downVotesBy.filter((userId) => userId !== authUser.id);
        const newComments = postDetail.comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, upVotesBy, downVotesBy };
          }
          return comment;
        });

        dispatch(updatePostDetailActionCreator({ ...postDetail, comments: newComments }));
      } else {
        const upVotesBy = [...comment.upVotesBy, authUser.id];
        const newComments = postDetail.comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, upVotesBy };
          }
          return comment;
        });

        dispatch(updatePostDetailActionCreator({ ...postDetail, comments: newComments }));
      }

      axios
        .post(
          `/threads/${postDetail.id}/comments/${commentId}/up-vote
        `,
          null,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        )
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    }

    dispatch(hideLoading());
  };
}

export function toggleDownVoteCommentAsyncThunk(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, postDetail } = getState();
    const comment = postDetail.comments.find((comment) => comment.id === commentId);

    const isUpVotedComment = comment.upVotesBy.includes(authUser.id);
    const isDownVotedComment = comment.downVotesBy.includes(authUser.id);

    if (isDownVotedComment) {
      const downVotesBy = comment.downVotesBy.filter((userId) => userId !== authUser.id);
      const newComments = postDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, downVotesBy };
        }
        return comment;
      });

      dispatch(updatePostDetailActionCreator({ ...postDetail, comments: newComments }));

      axios
        .post(
          `/threads/${postDetail.id}/comments/${commentId}/neutral-vote
        `,
          null,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        )
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    } else {
      if (isUpVotedComment) {
        const downVotesBy = [...comment.downVotesBy, authUser.id];
        const upVotesBy = comment.upVotesBy.filter((userId) => userId !== authUser.id);
        const newComments = postDetail.comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, upVotesBy, downVotesBy };
          }
          return comment;
        });

        dispatch(updatePostDetailActionCreator({ ...postDetail, comments: newComments }));
      } else {
        const downVotesBy = [...comment.downVotesBy, authUser.id];
        const newComments = postDetail.comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, downVotesBy };
          }
          return comment;
        });

        dispatch(updatePostDetailActionCreator({ ...postDetail, comments: newComments }));
      }

      axios
        .post(
          `/threads/${postDetail.id}/comments/${commentId}/down-vote
        `,
          null,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        )
        .catch((error) => {
          console.error(error);
          dispatch(updatePostDetailActionCreator(postDetail));
        });
    }

    dispatch(hideLoading());
  };
}
