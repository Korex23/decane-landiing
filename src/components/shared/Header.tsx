'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/svgs/logo.svg';
import { DISCORD, KIT } from '@/components/home/links';
import { PRODUCTS } from '@/components/home/products';
import { Glyph } from '@/components/home/bits';
import ThemeToggle from '@/components/home/ThemeToggle';

const LINKS = [
  { name: 'Developers', href: '#developers' },
  { name: 'Pricing', href: `${KIT}/pricing` },
  { name: 'Community', href: DISCORD },
];

const Caret = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [menu]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? 'border-line bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="" width={26} height={26} className="h-6 w-6" />
          <span className="font-viga text-[22px] text-ink">Decane</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block" aria-label="Main">
          <ul className="flex items-center gap-1 text-[14px] text-ink">
            <li ref={menuRef} className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5"
                aria-expanded={menu}
                aria-haspopup="true"
                onClick={() => setMenu((m) => !m)}
              >
                Products <Caret open={menu} />
              </button>
              <div className={`absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2 transition-all ${menu ? 'visible opacity-100' : 'invisible translate-y-1 opacity-0'}`}>
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-card p-2 shadow-soft">
                  {PRODUCTS.map((p) => (
                    <Link key={p.id} href={`#${p.id}`} onClick={() => setMenu(false)} className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-tint">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-gold-soft text-gold-ink">
                        <Glyph d={p.icon} size={17} />
                      </span>
                      <span>
                        <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
                          {p.name}
                          {p.soon && <span className="text-[11px] font-normal text-gold-ink">Soon</span>}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{p.line}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            {LINKS.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className="rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link href={`${KIT}/docs`} className="hidden rounded-full px-3.5 py-2 text-[14px] text-ink transition-colors hover:bg-ink/5 sm:inline-flex">
            Docs
          </Link>
          <Link href="#products" className="hidden rounded-full border border-ink px-4 py-1.5 text-[14px] text-ink transition-colors hover:bg-ink hover:text-bg sm:inline-flex">
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

      <div className={`overflow-hidden border-line transition-all duration-300 lg:hidden ${open ? 'max-h-[640px] border-t' : 'max-h-0'}`}>
        <ul className="mx-auto max-w-6xl px-3 py-3">
          {PRODUCTS.map((p) => (
            <li key={p.id}>
              <Link href={`#${p.id}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-[16px] text-ink hover:bg-tint">
                <span className="text-gold-ink">
                  <Glyph d={p.icon} size={18} />
                </span>
                {p.name}
              </Link>
            </li>
          ))}
          <li className="my-2 border-t border-line" />
          {[...LINKS, { name: 'Docs', href: `${KIT}/docs` }].map((l) => (
            <li key={l.name}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-[16px] text-ink hover:bg-tint">
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
