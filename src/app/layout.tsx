'use client';

import { GlobalContextProvider } from '@/components/context/userContext';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from '@/socket/sockectConnect';
const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalContextProvider>
          <QueryClientProvider client={queryClient}>
            <SocketProvider>{children}</SocketProvider>
          </QueryClientProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
