'use client';
import { useRef, useState, useEffect } from 'react';
import FileIcon from '../../assets/icons/file';
import EmojiPicker from 'emoji-picker-react';
import Emoji from '@/assets/icons/emoji';

const MessageBar = () => {
  const [message, setMessage] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleAddEmoji = (emoji: { emoji: string }) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessages = () => {
    // Your send message logic
  };

  // Close the emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center w-[100%] px-1 md:px-8 mb-6 gap-1 md:gap-6'>
      <div className='flex-1 flex bg-[#282b33] rounded-none items-center gap-1 md:gap-5 pr-5'>
        <input
          type='text'
          placeholder='Enter Messages'
          className='flex-1 p-5 md:p-5 bg-transparent rounded-md focus:border-none focus:outline-none'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className='flex gap-3 items-center'>
          <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
            <FileIcon />
          </button>

          <button
            onClick={() => setEmojiPickerOpen((prev) => !prev)}
            className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
          >
            <Emoji />
          </button>
          {emojiPickerOpen && (
            <div
              className='absolute bottom-16 right-0  z-50'
              ref={emojiPickerRef}
            >
              <EmojiPicker
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleSendMessages}
        className='bg-[#8417ff] hover:bg-[#6d13cc] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
      >
        Send
      </button>
    </div>
  );
};

export default MessageBar;
