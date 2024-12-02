import Close from '@/assets/icons/close';
import { useState } from 'react';
import { useThemeContext } from '../context/userContext';

const ChatHeader = () => {
  const { handleCloseChat, selectedChatData } = useThemeContext();

  const [avatarImage] = useState<string | null>(
    selectedChatData?.avatar ?? null
  );

  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-5 w-full'>
      {/* <div className='flex items-center justify-between'> */}
      <div className='flex gap-3 items-center justify-center'>
        <div className='cursor-pointer flex gap-2 items-center'>
          {avatarImage ? (
            <img
              src={selectedChatData ? selectedChatData.avatar : ''}
              alt='User Avatar'
              className='w-10 md:w-12 h-10 md:h-12 rounded-full object-cover'
              onClick={() => document.getElementById('avatar-upload')?.click()}
            />
          ) : (
            <div
              className='text-[green] font-bold uppercase w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-200 flex items-center justify-center'
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              {selectedChatData?.username?.[0]}
            </div>
          )}
          <div className='capitalize '>{selectedChatData?.username}</div>
        </div>
      </div>
      <div className=''>
        <button
          onClick={handleCloseChat}
          className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
        >
          <Close />
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ChatHeader;
