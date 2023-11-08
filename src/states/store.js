import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import postReducer from './posts/reducer';
import usersReducer from './users/reducer';
import postDetailReducer from './postDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const Store = configureStore({
  reducer: {
    authUser: authUserReducer,
    posts: postReducer,
    users: usersReducer,
    postDetail: postDetailReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default Store;
