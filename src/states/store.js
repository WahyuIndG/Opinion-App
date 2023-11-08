import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import postReducer from './posts/reducer';
import usersReducer from './users/reducer';
import postDetail from './postDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const Store = configureStore({
  reducer: {
    authUser: authUserReducer,
    posts: postReducer,
    users: usersReducer,
    postDetail: postDetail,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default Store;
