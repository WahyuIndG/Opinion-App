import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveLeaderboardsAsyncThunk } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(receiveLeaderboardsAsyncThunk());
  }, [dispatch]);

  return <LeaderboardList leaderboards={leaderboards} />;
}

export default LeaderboardPage;
