'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/svgs/logo.svg';
import { DISCORD, KIT } from '@/components/home/links';
import ThemeToggle from '@/components/home/ThemeToggle';

const NAV_ITEMS = [
  { name: 'Wallet', href: '#wallet' },
  { name: 'Connect Kit', href: '#connect-kit' },
  { name: 'Gas', href: '#gas' },
  { name: 'RPC', href: '#rpc' },
  { name: 'Docs', href: `${KIT}/docs` },
  { name: 'Community', href: DISCORD },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-2 py-2 pl-5 transition-all duration-300 ${
          scrolled || open ? 'border-line bg-card/85 shadow-soft backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="" width={30} height={30} className="h-7 w-7" />
          <span className="font-viga text-2xl text-ink">Decane</span>
        </Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 font-plusJakartaSans text-[14px] font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="#products"
            className="ml-1 hidden rounded-full bg-ink px-5 py-2.5 font-plusJakartaSans text-[14px] font-semibold text-bg transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Get started
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-all duration-300 lg:hidden ${
          open ? 'max-h-[520px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <ul className="p-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-plusJakartaSans text-[16px] font-medium text-ink hover:bg-ink/5"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
