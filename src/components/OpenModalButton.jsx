import React from 'react';
import { IoIosSend } from 'react-icons/io';
import Avatar from '../../Public/Images/myavatar.png';
import { useSelector } from 'react-redux';

const OpenModalButton = ({ buttonText, children, onButtonClicked }) => {
  const { authUser } = useSelector((state) => state);

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      onButtonClicked();
    }
  };

  return (
    <div className="flex justify-between py-[14px] gap-[12px] border-b border-dkinactive">
      <img className="w-[38px] h-[38px] rounded-full " src={authUser ? authUser.avatar : Avatar} />
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
};

export default OpenModalButton;