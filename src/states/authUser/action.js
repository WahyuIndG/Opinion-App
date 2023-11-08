import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axios, { getAccessToken, putAccessToken } from '../../utils/api';

export const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

export function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export function setAuthUserAsyncThunk(credentials = {}) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      if (Object.keys(credentials).length !== 0) {
        const responseLogin = await axios.post('/login', JSON.stringify(credentials), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        putAccessToken(responseLogin.data.data.token);
      }

      try {
        const responseAuth = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        dispatch(setAuthUserActionCreator(responseAuth.data.data.user));
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        alert(error.response?.data?.message);
        window.location.href = '/login';
      }
    }

    dispatch(hideLoading());
  };
}

export function unsetAuthUserAsyncThunk() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    putAccessToken('');
  };
}
