import { ActionType } from './action';

const postDetailReducer = (postDetail = null, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_POST_DETAIL:
      return action.payload.postDetail;
    case ActionType.CLEAR_POST_DETAIL:
      return action.payload.postDetail;
    case ActionType.UPDATE_POST_DETAIL:
      return action.payload.postDetail;
    case ActionType.ADD_COMMENT_POST_DETAIL:
      return { ...postDetail, comments: [...postDetail.comments, action.payload.comment] };
    default:
      return postDetail;
  }
};

export default postDetailReducer;
