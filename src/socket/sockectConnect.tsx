import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('https://async-chat-app-be.vercel.app/');

    socket.current.on('connect', () => {
      console.log('Connected:', socket.current?.id);
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected');
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};
