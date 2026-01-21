import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CS2 Strategy Roulette',
  description: 'Random strategy generator for Counter-Strike 2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

