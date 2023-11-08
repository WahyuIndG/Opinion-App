import React, { useEffect, useRef } from 'react';

import { AiFillCloseCircle } from 'react-icons/ai';

function SearchBar({ keyword, keywordChangeHandler, resetKeyword }) {
  const inputRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    closeRef.current.style.visibility = keyword !== '' ? 'visible' : 'hidden';
  }, [keyword]);

  const clearKeyword = () => {
    resetKeyword();
    inputRef.current.focus();
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl border border-[rgba(84,84,84,0.5)] my-4 py-4 px-5 flex items-center gap-2 text-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        id="search"
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="#545454"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          transform="translate(2 2)"
        >
          <circle cx="9.767" cy="9.767" r="8.989" />
          <line x1="16.018" x2="19.542" y1="16.485" y2="20" />
        </g>
      </svg>
      <input
        type="text"
        value={keyword}
        onChange={keywordChangeHandler}
        ref={inputRef}
        className=" outline-none bg-transparent w-full h-full p-1"
      />
      <button
        className="outline-none right-6 cursor-pointer p-1"
        onClick={clearKeyword}
        title="Clear"
        tabIndex="0"
        ref={closeRef}
      >
        <AiFillCloseCircle className="text-lg text-dkinactive" />
      </button>
    </div>
  );
}

export default SearchBar;
