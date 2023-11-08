import React from 'react';

function Leaderboard({ user: { name, avatar }, score, number }) {
  return (
    <div className="px-5 py-4 flex items-center gap-4 font-semibold">
      <span className=" bg-dkSecondary p-3 w-8 h-9 rounded-xl text-base sm:text-xl flex justify-center items-center">
        {number}
      </span>
      <img src={avatar} alt="avatar" className="ms-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full " />
      <p className="text-lg sm:text-2xl ">{name}</p>
      <p className="ml-auto text-xl sm:text-3xl text-[rgba(219,219,223,0.62)]">
        {score}
        <span className="text-base sm:text-xl">pts</span>
      </p>
    </div>
  );
}

export default Leaderboard;
