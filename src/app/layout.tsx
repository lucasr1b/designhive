import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DesignHive | Social Media for Designers',
  description: 'A social media platform for designers to share their work, get inspired and connect with other designers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
