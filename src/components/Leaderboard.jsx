import React from 'react';

const Leaderboard = ({ user: { name, avatar }, score, number }) => {
  return (
    <div className="px-5 py-4 flex items-center gap-4 font-semibold">
      <span className=" bg-dkSecondary p-3 w-8 h-9 rounded-xl text-xl flex justify-center items-center">{number}</span>
      <img src={avatar} alt="avatar" className="ms-4 w-16 h-16 rounded-full " />
      <p className="text-2xl ">{name}</p>
      <p className="ml-auto text-3xl text-[rgba(219,219,223,0.62)]">
        {score}
        <span className="text-xl">pts</span>
      </p>
    </div>
  );
};

export default Leaderboard;
