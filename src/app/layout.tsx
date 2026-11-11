import type { Metadata } from 'next';
import {
  Russo_One,
  Rouge_Script,
  Urbanist,
  Viga,
  Tajawal,
  Tac_One,
  Figtree,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';
import OverallLayout from '@/layout';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const russoOne = Russo_One({
  variable: '--font-russo-one',
  subsets: ['latin'],
  weight: ['400'],
});

const rougeScript = Rouge_Script({
  variable: '--font-rouge-script',
  subsets: ['latin'],
  weight: ['400'],
});

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
});

const viga = Viga({
  variable: '--font-viga',
  subsets: ['latin'],
  weight: ['400'],
});

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
});

const tacOne = Tac_One({
  variable: '--font-tac-one',
  subsets: ['latin'],
  weight: ['400'],
});

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Decane',
  description: 'Decane makes the Decane Wallet for people, and Connect Kit, gas sponsorship and Decane RPC for the apps they use.',
};

// Sets the saved theme before first paint so a dark-mode visitor never sees a
// light flash. Storage can be blocked; the system setting then decides.
const THEME_SCRIPT = `try{var t=localStorage.getItem('decane-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${russoOne.variable} ${rougeScript.variable} ${urbanist.variable} ${viga.variable} ${tajawal.variable} ${tacOne.variable} ${figtree.variable} font-sans min-h-screen antialiased`}
      >
        <OverallLayout>{children}</OverallLayout>
      </body>
    </html>
  );
}
