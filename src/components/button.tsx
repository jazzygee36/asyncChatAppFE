import React from 'react';

interface Props {
  title: string;
  type: 'submit' | 'reset' | 'button';
  className: string;
}

const Button = ({ className, title, type }: Props) => {
  return (
    <button type={type} className={`${className}  w-full h-10 rounded-xl`}>
      {title}
    </button>
  );
};

export default Button;
