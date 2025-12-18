import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/contexts/themeContext';
import ClerkAppearanceProvider from '@/components/ClerkAppearanceProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Expense Tracker AI - Track Your Spending',
  description: 'AI-powered expense tracking application to manage your spending, analyze patterns, and get personalized financial insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300`}>
        <ThemeProvider>
          <ClerkAppearanceProvider>
            <Navbar />
            {children}
            <Footer />
          </ClerkAppearanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
