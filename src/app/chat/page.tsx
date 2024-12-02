'use client';
// import Chatcontainer from '@/components/chatContainer/chat-container';
import Chatcontainer from '@/components/chatContainer/chat-container';
import ContactsContainer from '@/components/contactInfo/contacts-container';
import { useThemeContext } from '@/components/context/userContext';
import EmptyChatContainer from '@/components/empty-chat-container';
// import { createChatSlice } from '@/components/store/slices/chat-slice';
// import EmptyChatContainer from '@/components/empty-chat-container';

const Chats = () => {
  const { selectedChatType } = useThemeContext();

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />

      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <Chatcontainer />
      )}
    </div>
  );
};

export default Chats;
