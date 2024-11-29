import React from 'react';

interface Props {
  title: string;
  type: 'submit' | 'reset' | 'button';
  className: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ className, title, type, disabled, onClick }: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className}  w-full h-10 rounded-xl`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
