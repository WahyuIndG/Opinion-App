import { ActionType } from './action';

const postReducer = (posts = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_POST:
      return action.payload.posts;
    case ActionType.CREATE_POST:
      return [...posts, action.payload.post];
    case ActionType.UPDATE_POSTS:
      return action.payload.posts;
    default:
      return posts;
  }
};

export default postReducer;
