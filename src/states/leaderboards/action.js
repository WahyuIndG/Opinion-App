import { hideLoading, showLoading } from 'react-redux-loading-bar';
import axios from '../../utils/api';

export const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

export function receiveLeaderboards(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

export function receiveLeaderboardsAsyncThunk() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await axios.get('/leaderboards');
      dispatch(receiveLeaderboards(response.data.data.leaderboards));
    } catch (error) {
      console.error();
    }

    dispatch(hideLoading());
  };
}
