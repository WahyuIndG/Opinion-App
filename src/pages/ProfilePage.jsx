import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { unsetAuthUserAsyncThunk } from '../states/authUser/action';

function ProfilePage({ self }) {
  const authUser = useSelector((states) => states.authUser);
  const users = useSelector((states) => states.users);

  const dispatch = useDispatch();
  const navigate = useNavigate('');
  const { userId } = useParams();

  const getUser = () => users.find((user) => user.id === userId);

  const profile = self ? authUser : getUser();

  const onLogout = () => {
    dispatch(unsetAuthUserAsyncThunk());
    navigate('/login');
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] grid place-items-center">
      <div className="min-w-[300px] p-8 border-[2px] border-[rgba(121,121,121,0.26)] rounded-2xl flex flex-col items-center">
        <img src={profile.avatar} alt="profile" className="w-24 h-24 rounded-full" />
        <h1 className="mt-4 text-3xl font-semibold">{profile.name}</h1>
        <h2 className="mt-3 text-base font-light bg-dkSecondary py-1 px-3 rounded-md">
          {profile.email}
        </h2>
        {self && (
          <button className="text-3xl mt-8" onClick={onLogout}>
            <FaSignOutAlt />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
