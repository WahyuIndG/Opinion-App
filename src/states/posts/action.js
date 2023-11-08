import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axios, { getAccessToken } from '../../utils/api';

export const ActionType = {
  RECEIVE_POST: 'RECEIVE_POST',
  UPDATE_POSTS: 'UPDATE_POSTS',
  CREATE_POST: 'CREATE_POST',
};

export function receivePostActionCreator(posts) {
  return {
    type: ActionType.RECEIVE_POST,
    payload: {
      posts,
    },
  };
}

export function updatePostsActionCreator(posts) {
  return {
    type: ActionType.UPDATE_POSTS,
    payload: {
      posts,
    },
  };
}

export function createPostActionCreator(post) {
  return {
    type: ActionType.CREATE_POST,
    payload: {
      post,
    },
  };
}

export function createPostAsyncThunk(post) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    try {
      const resposne = await axios.post('/threads', JSON.stringify(post), {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(createPostActionCreator(resposne.data.data.thread));
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message);
    }

    dispatch(showLoading());
  };
}

export function toggleUpVoteAsyncThunk(postId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, posts } = getState();
    const post = posts.find((post) => post.id === postId);

    const isUpVotedPost = post.upVotesBy.includes(authUser.id);
    const isDownVotedPost = post.downVotesBy.includes(authUser.id);

    if (isUpVotedPost) {
      const upVotesBy = post.upVotesBy.filter((userId) => userId !== authUser.id);
      const newPosts = posts.map((post) => {
        if (post.id == postId) {
          return { ...post, upVotesBy };
        }
        return post;
      });

      dispatch(updatePostsActionCreator(newPosts));

      axios
        .post(`/threads/${postId}/neutral-vote`, null, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostsActionCreator(posts));
        });
    } else {
      if (isDownVotedPost) {
        const upVotesBy = [...post.upVotesBy, authUser.id];
        const downVotesBy = post.downVotesBy.filter((userId) => userId !== authUser.id);
        const newPosts = posts.map((post) => {
          if (post.id === postId) {
            return { ...post, upVotesBy, downVotesBy };
          }
          return post;
        });

        dispatch(updatePostsActionCreator(newPosts));
      } else {
        const upVotesBy = [...post.upVotesBy, authUser.id];
        const newPosts = posts.map((post) => {
          if (post.id === postId) {
            return { ...post, upVotesBy };
          }
          return post;
        });

        dispatch(updatePostsActionCreator(newPosts));
      }

      axios
        .post(`/threads/${postId}/up-vote`, null, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostsActionCreator(posts));
        });
    }

    dispatch(hideLoading());
  };
}

export function toggleDownVoteAsyncThunk(postId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, posts } = getState();
    const post = posts.find((post) => post.id === postId);

    const isUpVotedPost = post.upVotesBy.includes(authUser.id);
    const isDownVotedPost = post.downVotesBy.includes(authUser.id);

    if (isDownVotedPost) {
      const downVotesBy = post.downVotesBy.filter((userId) => userId !== authUser.id);
      const newPosts = posts.map((post) => {
        if (post.id == postId) {
          return { ...post, downVotesBy };
        }
        return post;
      });

      dispatch(updatePostsActionCreator(newPosts));

      axios
        .post(`/threads/${postId}/neutral-vote`, null, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostsActionCreator(posts));
        });
    } else {
      if (isUpVotedPost) {
        const upVotesBy = post.upVotesBy.filter((userId) => userId !== authUser.id);
        const downVotesBy = [...post.downVotesBy, authUser.id];
        const newPosts = posts.map((post) => {
          if (post.id == postId) {
            return { ...post, upVotesBy, downVotesBy };
          }
          return post;
        });

        dispatch(updatePostsActionCreator(newPosts));
      } else {
        const downVotesBy = [...post.downVotesBy, authUser.id];
        const newPosts = posts.map((post) => {
          if (post.id === postId) {
            return { ...post, downVotesBy };
          }
          return post;
        });

        dispatch(updatePostsActionCreator(newPosts));
      }

      axios
        .post(`/threads/${postId}/down-vote`, null, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .catch((error) => {
          console.error(error);
          dispatch(updatePostsActionCreator(posts));
        });
    }

    dispatch(hideLoading());
  };
}

export function addCommentPostAsyncThunk(postId, content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { posts } = getState();

    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, totalComments: post.totalComments + 1 };
      }
      return post;
    });

    dispatch(updatePostsActionCreator(newPosts));

    axios
      .post(`/threads/${postId}/comments`, JSON.stringify({ content }), {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAccessToken()}` },
      })
      .catch((error) => {
        console.error(error);
        dispatch(posts);
      });

    dispatch(hideLoading());
  };
}
