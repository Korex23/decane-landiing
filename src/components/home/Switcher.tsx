'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS } from './products';
import { Glyph } from './bits';

const STEP_MS = 5500;

/** The hero's product switcher: each product gets the same turn on stage. */
export default function Switcher() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % PRODUCTS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  const p = PRODUCTS[active]!;
  const external = p.cta.href.startsWith('http');

  return (
    <div
      className="overflow-hidden rounded-[32px] border border-line bg-card shadow-soft"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div role="tablist" aria-label="Decane products" className="grid grid-cols-4 gap-1 border-b border-line p-2">
        {PRODUCTS.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="switcher-panel"
              onClick={() => setActive(i)}
              className={`relative overflow-hidden rounded-2xl px-2 py-2.5 font-plusJakartaSans text-[12.5px] font-semibold transition-colors sm:text-[13.5px] ${
                on ? 'bg-bg text-ink' : 'text-faint hover:text-ink'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                <span className={`hidden sm:inline ${on ? 'text-gold-ink' : ''}`}>
                  <Glyph d={x.icon} size={15} />
                </span>
                {x.short}
              </span>
              {on && !paused && !reduce && (
                <motion.span
                  key={`bar-${active}`}
                  className="absolute bottom-0 left-0 h-[2px] bg-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div id="switcher-panel" role="tabpanel" className="dots relative flex h-[400px] items-center justify-center overflow-hidden bg-bg-2/60 px-6 sm:h-[430px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            className="flex w-full justify-center"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p.Visual />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
        <div className="min-w-0">
          <p className="font-plusJakartaSans text-[14px] font-semibold text-ink">
            {p.name}
            {p.soon && <span className="ml-2 font-medium text-gold-ink">· Coming soon</span>}
          </p>
          <p className="truncate font-plusJakartaSans text-[13px] text-muted">{p.line}</p>
        </div>
        <Link
          href={p.cta.href}
          {...(external ? { target: '_blank', rel: 'noopener' } : {})}
          className="flex-none rounded-full border border-line px-4 py-2 font-plusJakartaSans text-[13px] font-semibold text-ink transition-colors hover:border-ink"
        >
          {p.id === 'wallet' ? 'Get it' : 'Read more'}
        </Link>
      </div>
    </div>
  );
}
