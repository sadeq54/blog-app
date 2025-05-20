import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple Blog',
  description: 'A blog built with Next.js, TypeScript, and Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Simple Blog</h1>
        </header>
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Simple Blog. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}