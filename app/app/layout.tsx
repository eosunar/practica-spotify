
'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
