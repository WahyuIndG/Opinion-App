import React, { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useSelector } from 'react-redux';

const NewCommentForm = ({ onSubmit, showModal, ownerName }) => {
  const [body, setBody] = useState('');
  const { authUser } = useSelector((state) => state);

  const bodyRef = useRef();
  const formRef = useRef();
  const submitRef = useRef();

  useEffect(() => {
    showModal && bodyRef.current.focus();
  }, [showModal]);

  useEffect(() => {
    if (body !== '') {
      submitRef.current.style.color = '#EEE5E5';
      submitRef.current.style.cursor = 'pointer';
    } else {
      submitRef.current.style.color = '#777777';
      submitRef.current.style.cursor = 'not-allowed';
    }
  }, [body]);

  const enterHandler = (e) => {
    if (e.key === 'Enter' && !(e.ctrlKey || e.shiftKey || e.metaKey || e.altKey)) {
      e.preventDefault();
      submitHandler(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (body !== '') {
      setBody('');
      bodyRef.current.innerHTML = '';
      onSubmit(body);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={submitHandler}
      className="bg-[#181818] rounded-2xl border-[1.25px] border-dkinactive p-6 flex flex-col"
    >
      <div className="flex items-center gap-3">
        <img className="w-[32px] h-[32px] rounded-full" src={authUser?.avatar} />
        <h1 className="text-sm font-medium">{authUser?.name}</h1>
      </div>
      <div
        ref={bodyRef}
        className="outline-none text-base mt-3 font-light"
        data-placeholder={`Reply to ${ownerName}`}
        contentEditable
        onInput={(event) => setBody(event.target.innerHTML)}
        onKeyDown={enterHandler}
      />
      <div className="flex mt-8">
        <button
          type="submit"
          ref={submitRef}
          className="ml-auto flex justify-center items-center gap-1 rounded-xl border border-dkinactive text-sm font-medium p-[10px] text-[#777777] focus:text-dkText"
        >
          <IoIosSend className=" text-xl" />
          Reply
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
