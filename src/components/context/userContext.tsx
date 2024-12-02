'use client';

import { createContext, useState, FC, useContext, Dispatch } from 'react';

interface Props {
  children: React.ReactNode;
}

type Contact = {
  id: string;
  username: string;
  email: string;
  avatar?: string; // Optional avatar URL
};

type Message = {
  id: string;
  username: string;
  email: string;
  avatar?: string; // Optional avatar URL
};

type SelectedChatType = 'group' | 'contact' | undefined;
type SelectedChatData = Contact | null;
type SelectedChatMessages = Message[];

type ThemeContext = {
  selectedChatType: SelectedChatType;
  selectedChatData: SelectedChatData;
  selectedChatMessages: SelectedChatMessages;
  setSelectedChatType: Dispatch<React.SetStateAction<SelectedChatType>>;
  setSelectedChatData: Dispatch<React.SetStateAction<SelectedChatData>>;
  setSelectedChatMessages: Dispatch<React.SetStateAction<SelectedChatMessages>>;
  handleCloseChat: () => void;
};

export const GlobalContext = createContext<ThemeContext | null>(null);

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [selectedChatType, setSelectedChatType] =
    useState<SelectedChatType>(undefined);
  const [selectedChatData, setSelectedChatData] =
    useState<SelectedChatData>(null);
  const [selectedChatMessages, setSelectedChatMessages] =
    useState<SelectedChatMessages>([]);

  const handleCloseChat = () => {
    setSelectedChatType(undefined);
    setSelectedChatData(null);
    setSelectedChatMessages([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        selectedChatType,
        selectedChatData,
        selectedChatMessages,
        setSelectedChatType,
        setSelectedChatData,
        setSelectedChatMessages,
        handleCloseChat,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useThemeContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      'useThemeContext must be used with a GlobalContextProvider'
    );
  }
  return context;
}
