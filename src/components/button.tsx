import React from 'react';

interface Props {
  title: string;
  type: 'submit' | 'reset' | 'button';
  className: string;
  disabled?: boolean;
}

const Button = ({ className, title, type, disabled }: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className}  w-full h-10 rounded-xl`}
    >
      {title}
    </button>
  );
};

export default Button;
