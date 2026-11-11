import type { Metadata } from 'next';
import { Viga, Tajawal, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import OverallLayout from '@/layout';

// Plus Jakarta Sans is Decane's face: the page, kit.decane.app and the Connect
// Kit modal all use it. Viga is the wordmark; Tajawal the legal page.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});
const viga = Viga({ variable: '--font-viga', subsets: ['latin'], weight: ['400'] });
const tajawal = Tajawal({ variable: '--font-tajawal', subsets: ['latin'], weight: ['300', '400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Decane',
  description: 'Decane makes the Decane Wallet for people, and Connect Kit, gas sponsorship and Decane RPC for the apps they use.',
};

// Sets the saved theme before first paint so a dark-mode visitor never sees a
// light flash. Storage can be blocked; the system setting then decides.
const THEME_SCRIPT = `try{var t=localStorage.getItem('decane-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${plusJakartaSans.variable} ${viga.variable} ${tajawal.variable} font-sans min-h-screen antialiased`}>
        <OverallLayout>{children}</OverallLayout>
      </body>
    </html>
  );
}
