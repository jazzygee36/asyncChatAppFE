import Chatcontainer from '@/components/chatContainer/chat-container';
import ContactsContainer from '@/components/contactInfo/contacts-container';
import EmptyChatContainer from '@/components/empty-chat-container';
import React from 'react';

const Chats = () => {
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      {/* <Chatcontainer /> */}
    </div>
  );
};

export default Chats;
