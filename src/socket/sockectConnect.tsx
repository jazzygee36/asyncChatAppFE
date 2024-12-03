import { useUser } from '@/hooks/user';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useUser(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user?.user) {
      const { id } = user.user;

      // Use environment variable or fallback URL
      const HOST = 'https://async-chat-app-be.vercel.app/';

      const newSocket = io(HOST, {
        withCredentials: true,
        query: { userId: id },
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        console.log('Disconnected from server');
        setSocket(null);
      };
    }
  }, [user?.user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
