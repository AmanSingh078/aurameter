import type { Metadata } from 'next';
import '../globals.css';

// Using Titillium Web instead of EB Garamond
const displaySerif = {
  variable: '--font-display-serif'
};

export const metadata: Metadata = {
  title: 'Aurameter - Know More',
  description: 'Learn more about Aurameter, the AI-powered social platform for Gen Z',
};

export default function KnowMoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white font-sans">
        {children}
      </body>
    </html>
  );
}