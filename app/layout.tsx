import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/LanguageProvider"
import Navbar from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FreeStuff - Post and Find Free Used Items',
  description: 'A platform for posting and finding free used items in your area',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freestuff.example.com',
    siteName: 'FreeStuff',
    images: [
      {
        url: 'https://freestuff.example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FreeStuff - Post and Find Free Used Items',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@freestuff',
    creator: '@freestuff',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}