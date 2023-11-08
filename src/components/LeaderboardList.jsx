import React from 'react';
import Leaderboard from './Leaderboard';

const LeaderboardList = ({ leaderboards }) => {
  return (
    <ul className="py-5">
      {leaderboards.map((leaderboard, i) => (
        <li key={leaderboard.user.id}>
          <Leaderboard {...leaderboard} number={++i} />
        </li>
      ))}
    </ul>
  );
};

export default LeaderboardList;
