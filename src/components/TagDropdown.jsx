import React, { useState } from 'react';
import { BsFilter, BsCheck } from 'react-icons/bs';

export default function TagDropdown({ selectHandler, selected, categories }) {
  const [dropdown, setDropdown] = useState(false);

  const onSelect = (value) => {
    setDropdown((prev) => !prev);
    selectHandler(value);
  };

  return (
    <aside className="fixed left-[50%] translate-x-[-50%] md:translate-x-0 md:left-10 bottom-20 md:bottom-9 flex flex-col items-center md:items-start gap-3">
      <ul
        className={`w-fit bg-dkSecondary rounded-xl p-2 flex flex-col gap-2 border-1 border-[rgba(76,76,76,0.2)]  ${
          dropdown ? 'visible' : 'hidden'
        }`}
      >
        {categories.map((option) => (
          <li key={option}>
            <button
              onClick={(e) => onSelect(e.target.innerText)}
              className={`min-w-[160px] w-full text-sm flex justify-between items-center py-1 px-2 ${
                selected === option && 'bg-[rgba(108,111,126,0.3)] '
              } rounded-lg hover:bg-[rgba(108,111,126,0.3)]`}
            >
              {option}
              {option === selected && <BsCheck className="text-xl" />}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setDropdown((prev) => !prev)}
        className="flex gap-2 justify-center items-center py-4 px-6 bg-dkSecondary border-1 border-[rgba(76,76,76,0.2)] rounded-full text-sm font-medium"
      >
        #{selected === '' ? 'Category' : selected}
        <BsFilter className="text-2xl text-dkinactive" />
      </button>
    </aside>
  );
}
