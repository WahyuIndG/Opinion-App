/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { IoIosSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Avatar from '../../Public/Images/myavatar.png';

function OpenModalButton({ buttonText, children, onButtonClicked }) {
  const authUser = useSelector((state) => state.authUser);

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      onButtonClicked();
    }
  };

  return (
    <div className="flex justify-between py-[14px] gap-[12px] border-b border-[rgba(84,84,84,0.50)]">
      <img
        className="w-[38px] h-[38px] rounded-full "
        src={authUser ? authUser.avatar : Avatar}
        alt="avatar"
      />
      <div className="flex-grow flex items-center text-dkinactive ">
        <p
          className="flex-grow h-full flex items-center rounded-2xl text-sm bg-transparent cursor-text"
          tabIndex="0"
          onClick={onButtonClicked}
          onKeyDown={onKeyPressHandler}
        >
          {children}
        </p>
        <span className="flex justify-center items-center gap-1 rounded-xl border border-dkinactive text-sm font-medium p-2 text-[#777777] cursor-not-allowed">
          <IoIosSend className=" text-xl" /> {buttonText}
        </span>
      </div>
    </div>
  );
}

export default OpenModalButton;
