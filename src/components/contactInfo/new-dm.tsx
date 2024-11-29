'use client';
import Plus from '@/assets/icons/plus';
import { useState } from 'react';

const NewDirectMessage = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  return (
    <>
      <div
        className='text-neutral-400 font-light text-start hover:text-neutral-100 cursor-pointer transition-all duration-300'
        onClick={() => setOpenNewContactModal(true)}
      >
        <Plus />
      </div>
    </>
  );
};

export default NewDirectMessage;
