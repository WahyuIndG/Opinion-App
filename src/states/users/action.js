import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axios from '../../utils/api';
import { setAuthUserAsyncThunk } from '../authUser/action';

export const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

export function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

export function registerUserAsyncThunk(user) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const responseRegister = await axios.post('/register', JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const credentials = {
        email: responseRegister.data.data.user,
        password: user.password,
      };

      dispatch(setAuthUserAsyncThunk(credentials));
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        alert(error.response?.data?.message);
        window.location.href = '/register';
      }
    }

    dispatch(hideLoading());
  };
}

export function setUsersAsyncThunk() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const responseUsers = await axios.get('/users');

      dispatch(receiveUsersActionCreator(responseUsers.data.data.users));
    } catch (error) {
      console.error(error);
    }

    dispatch(hideLoading());
  };
}
