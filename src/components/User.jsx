import React from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';

function User({ id, name, email, avatar }) {
  return (
    <Link to={`/search/${id}`} className="flex gap-6 border-b-[1px] border-dkinactive py-6">
      <img src={avatar} alt="user" className="w-16 h-16 rounded-full" />

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">{name}</h1>
          <h1 className="text-sm font-light">{email}</h1>
        </div>

        <MdOutlineNavigateNext className="text-4xl mr-2" />
      </div>
    </Link>
  );
}

export default User;
