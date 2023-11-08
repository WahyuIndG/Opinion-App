import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axios from '../../utils/api';
import { receivePostActionCreator } from '../posts/action';
import { receiveUsersActionCreator } from '../users/action';

export function populatePostsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const responseUsers = await axios.get('/users');
      const responsePosts = await axios.get('/threads');

      dispatch(receiveUsersActionCreator(responseUsers.data.data.users));
      dispatch(receivePostActionCreator(responsePosts.data.data.threads));
    } catch (error) {
      console.error(error);
    }

    dispatch(hideLoading());
  };
}
