import React, { useState } from 'react';

function FormInput({ type, icon, placeholder, value, setValue }) {
  const [focus, setFocus] = useState(false);

  return (
    <label
      htmlFor={type}
      className="w-[265px] bg-dkSecondary rounded-lg p-3 flex items-center gap-3"
    >
      {icon && <i className={`text-2xl ${focus ? 'text-dkText' : 'text-dkinactive'}`}>{icon}</i>}
      <input
        type={type}
        id={type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(value !== '')}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        className="bg-transparent outline-none flex-grow text-sm placeholder:text-sm placeholder:text-dkinactive placeholder:font-medium"
      />
    </label>
  );
}

export default FormInput;
