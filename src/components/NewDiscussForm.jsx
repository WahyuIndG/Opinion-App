import React, { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import useInput from '../hooks/useInput';

const NewDiscussForm = ({ showModal, onSubmit }) => {
  const [title, setTitle, resetTitle] = useInput('');
  const [category, setCategory, resetCategory] = useInput('');
  const [body, setBody] = useState('');
  const [focus, setFocus] = useState(false);

  const formRef = useRef();
  const submitRef = useRef();
  const titleRef = useRef();
  const contentEditableRef = useRef();

  useEffect(() => {
    showModal && titleRef.current.focus();
  }, [showModal]);

  useEffect(() => {
    if (title !== '' && body !== '') {
      submitRef.current.style.color = '#EEE5E5';
      submitRef.current.style.cursor = 'pointer';
    } else {
      submitRef.current.style.color = '#777777';
      submitRef.current.style.cursor = 'not-allowed';
    }
  }, [title, body]);

  const bodyChangeHandler = (e) => {
    setBody(e.target.innerHTML);
  };

  const enterHandler = (e) => {
    if (e.key === 'Enter' && !(e.ctrlKey || e.shiftKey || e.metaKey || e.altKey)) {
      e.preventDefault();
      submitHandler(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (title !== '' && body !== '') {
      resetTitle();
      resetCategory();
      setBody('');
      setFocus(false);
      contentEditableRef.current.innerHTML = '';
      onSubmit({ title, category, body });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={submitHandler}
      className="bg-[#181818] rounded-2xl border-[1.25px] border-dkinactive p-6 flex flex-col"
    >
      <input
        value={title}
        onChange={setTitle}
        ref={titleRef}
        type="text"
        placeholder="Untitled"
        className="bg-transparent outline-none focus:placeholder:text-[#717070] placeholder:text-dkinactive placeholder:text-3xl text-3xl placeholder:font-semibold font-semibold"
      />
      <label htmlFor="category" className={`text-sm mt-1 ${focus ? 'text-inherit' : 'text-dkinactive'}`}>
        #
        <input
          id="category"
          value={category}
          onChange={setCategory}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(category === '' ? false : true)}
          type="text"
          placeholder="tag"
          className="bg-transparent outline-none focus:placeholder:text-[#717070] placeholder:text-dkinactive "
        />
      </label>

      <div
        ref={contentEditableRef}
        className="outline-none text-base mt-5 font-normal"
        data-placeholder="press [shift + ↲] for new line"
        contentEditable
        onInput={bodyChangeHandler}
        onKeyDown={enterHandler}
      ></div>
      <div className="flex mt-8">
        <button
          type="submit"
          ref={submitRef}
          className="ml-auto flex justify-center items-center gap-1 rounded-xl border border-dkinactive text-sm font-medium p-[10px] text-[#777777] focus:text-dkText "
        >
          <IoIosSend className=" text-xl" />
          Enter
        </button>
      </div>
    </form>
  );
};

export default NewDiscussForm;
