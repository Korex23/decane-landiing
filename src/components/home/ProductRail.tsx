'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PRODUCTS, type Product } from './products';
import { Arrow, Glyph, isExternal } from './bits';

// The products as a pinned horizontal scroll: the section holds the screen
// while scrolling down slides the four cards across. Phones and reduced motion
// get the same cards stacked, with no pinning.

const TINTS = ['tint-a', 'tint-b', 'tint-c', 'tint-d'];

// Left edge of the 1320px column, so the first card lines up with the heading.
const EDGE = 'max(20px, calc((100vw - 1320px) / 2 + 20px))';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function Links({ p }: { p: Product }) {
  return (
    <>
      <Link
        href={p.cta.href}
        {...(isExternal(p.cta.href) ? { target: '_blank', rel: 'noopener' } : {})}
        className="group inline-flex items-center gap-1.5 text-[14px] text-ink"
      >
        {p.cta.label}
        <span className="transition-transform group-hover:translate-x-0.5">
          <Arrow />
        </span>
      </Link>
      <Link
        href={p.more.href}
        {...(isExternal(p.more.href) ? { target: '_blank', rel: 'noopener' } : {})}
        className="text-[14px] text-muted transition-colors hover:text-ink"
      >
        {p.more.label}
      </Link>
    </>
  );
}

function Meta({ p, i }: { p: Product; i: number }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-faint">
      <span className="tabular-nums">0{i + 1}</span>
      <span aria-hidden="true">·</span>
      <span>{p.name}</span>
      <span aria-hidden="true">·</span>
      <span>{p.audience}</span>
      {p.soon && <span className="ml-auto rounded-full bg-gold-soft px-2.5 py-0.5 text-[11.5px] text-gold-ink">Coming soon</span>}
    </div>
  );
}

/** Pinned: a wide slide, copy and points left, the product screen right. */
function Slide({ p, i }: { p: Product; i: number }) {
  return (
    <article className={`${TINTS[i]} grid h-full w-[min(1080px,84vw)] flex-none grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-3xl border border-line`}>
      <div className="flex min-h-0 flex-col p-8 xl:p-10">
        <Meta p={p} i={i} />
        <h3 className="mt-5 text-[28px] font-medium leading-[1.1] tracking-[-0.025em] text-ink xl:text-[34px]">{p.title}</h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
        <ul className="mt-6 space-y-2.5">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2.5 text-[14px] leading-snug text-ink/85">
              <span className="mt-[3px] grid h-4 w-4 flex-none place-items-center rounded-full bg-gold-soft text-gold-ink">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-6 pt-6">
          <Links p={p} />
        </div>
      </div>
      <div className="relative flex min-h-0 items-center justify-center overflow-hidden px-6">
        <p.Visual />
      </div>
    </article>
  );
}

/** Stacked (phones, reduced motion): the card as before. */
function Card({ p, i }: { p: Product; i: number }) {
  return (
    <article className={`${TINTS[i]} flex w-full flex-col overflow-hidden rounded-3xl border border-line`}>
      <div className="p-7 pb-0 md:p-8 md:pb-0">
        <Meta p={p} i={i} />
        <h3 className="mt-4 text-[24px] font-medium leading-tight tracking-[-0.02em] text-ink md:text-[26px]">{p.title}</h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{p.line}</p>
      </div>
      <div className="relative flex h-[380px] items-center justify-center overflow-hidden px-5">
        <p.Visual />
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-line px-7 py-4 md:px-8">
        <Links p={p} />
      </div>
    </article>
  );
}

function Heading({ active, onPick }: { active: number; onPick?: (i: number) => void }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <h2 className="h-display max-w-3xl text-[34px] md:text-[44px]">
        Four products, one account
        <br />
        <span className="soft">for apps and their users</span>
      </h2>
      <ul className="flex flex-wrap gap-2">
        {PRODUCTS.map((p, i) => (
          <li key={p.id}>
            <a
              href={`#${p.id}`}
              onClick={(e) => {
                if (!onPick) return;
                e.preventDefault();
                onPick(i);
              }}
              aria-current={active === i ? 'true' : undefined}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                active === i ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-ink/30 hover:text-ink'
              }`}
            >
              <span className={active === i ? '' : 'text-gold-ink'}>
                <Glyph d={p.icon} size={14} />
              </span>
              {p.short}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductRail() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const pinned = wide && !reduce;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);

  // How far the track has to slide: its full width less one screen.
  useIsoLayoutEffect(() => {
    if (!pinned || !track.current) return;
    const measure = () => {
      const el = track.current!;
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (v) => -v * travel);
  const bar = useTransform(smooth, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(PRODUCTS.length - 1, Math.max(0, Math.round(v * (PRODUCTS.length - 1)))));
  });

  // Scroll to the point where card i is in view.
  const pick = (i: number) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * i) / (PRODUCTS.length - 1), behavior: reduce ? 'auto' : 'smooth' });
  };

  if (!pinned) {
    return (
      <section id="products" ref={section} className="relative mx-auto max-w-[1320px] scroll-mt-24 px-5 pb-24 pt-16 md:pb-32 md:pt-20">
        <Heading active={-1} />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <div key={p.id} id={p.id} className="scroll-mt-24">
              <Card p={p} i={i} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="products" ref={section} className="relative" style={{ height: `calc(100vh + ${travel}px)` }}>
      {/* Anchors at the scroll point where each card is on stage, so #wallet etc. still land right. */}
      {PRODUCTS.map((p, i) => (
        <span
          key={p.id}
          id={p.id}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{ top: (travel * i) / (PRODUCTS.length - 1) }}
        />
      ))}

      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-8 pt-24">
        <div className="mx-auto w-full max-w-[1320px] px-5">
          <Heading active={active} onPick={pick} />
        </div>

        <motion.div ref={track} style={{ x, paddingLeft: EDGE, paddingRight: EDGE }} className="mt-8 flex min-h-0 flex-1 gap-5">
          {PRODUCTS.map((p, i) => (
            <Slide key={p.id} p={p} i={i} />
          ))}
        </motion.div>

        <div className="mx-auto mt-6 flex w-full max-w-[1320px] items-center gap-4 px-5">
          <span className="text-[13px] tabular-nums text-faint">
            0{active + 1} / 0{PRODUCTS.length}
          </span>
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-line">
            <motion.div className="h-full bg-gold" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
