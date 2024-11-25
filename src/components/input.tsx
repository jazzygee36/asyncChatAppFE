import React from 'react';
interface Props {
  type: string;
  placeholder: string;
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const Input = ({
  type,
  placeholder,
  className,
  value,
  onChange,
  name,
}: Props) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={`${className} px-3 outline-none h-10 border border-[grey] rounded-md w-full`}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
