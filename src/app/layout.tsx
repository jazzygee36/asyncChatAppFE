'use client';

import { GlobalContextProvider } from '@/components/context/userContext';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
            {children}
          </QueryClientProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
