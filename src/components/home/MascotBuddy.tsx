'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

// The Decane mascot hops down the right edge from section to section. Each
// section has a perch; when you scroll into a new one it crouches, leaps in an
// arc (stretching, tilting, mouth open), lands with a squash and a bounce, and
// settles. Perched, it breathes, blinks and watches the cursor. A click goes
// back to the top. With reduced motion it sits still in the corner.

const MAX_LOOK = 2.2; // how far the pupils travel, in SVG units
const SIZE = 56;

/** The page's top-level sections: big blocks that are not inside another one. */
function findSections(): HTMLElement[] {
  const all = Array.from(document.querySelectorAll<HTMLElement>('header, section, footer')).filter((el) => el.offsetHeight > 280);
  return all.filter((el) => !all.some((other) => other !== el && other.contains(el)));
}

/** The perch for section i of n: spread down the right edge of the screen. */
function perchY(i: number, n: number) {
  const h = window.innerHeight;
  const top = h * 0.16;
  const bottom = h * 0.84 - SIZE;
  return n <= 1 ? top : top + ((bottom - top) * i) / (n - 1);
}

export default function MascotBuddy() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [blink, setBlink] = useState(false);
  const [air, setAir] = useState(false);
  const [shown, setShown] = useState(false);

  // Body: position and the squash-and-stretch of each hop.
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const sx = useMotionValue(1);
  const sy = useMotionValue(1);
  const rot = useMotionValue(0);

  const hop = useRef({ index: -1, n: 0, run: 0 });

  // Eyes follow the pointer.
  const lookX = useMotionValue(0);
  const lookY = useMotionValue(0);
  const eyeX = useSpring(lookX, { stiffness: 220, damping: 20 });
  const eyeY = useSpring(lookY, { stiffness: 220, damping: 20 });

  const jumpTo = useCallback(
    async (index: number, n: number) => {
      const from = y.get();
      const to = perchY(index, n);
      const run = ++hop.current.run;
      const alive = () => hop.current.run === run;
      const dir = to > from ? 1 : -1;
      const dist = Math.abs(to - from);
      const apex = Math.min(from, to) - Math.min(90, 40 + dist * 0.25);
      const t = Math.min(0.5, 0.26 + dist / 2400);

      // crouch
      await Promise.all([
        animate(sy, 0.78, { duration: 0.09, ease: 'easeOut' }),
        animate(sx, 1.18, { duration: 0.09, ease: 'easeOut' }),
      ]);
      if (!alive()) return;
      setAir(true);
      // take off, up to the top of the arc
      await Promise.all([
        animate(y, apex, { duration: t, ease: [0.2, 0.7, 0.3, 1] }),
        animate(x, -22, { duration: t, ease: 'easeOut' }),
        animate(sy, 1.16, { duration: t * 0.4 }),
        animate(sx, 0.88, { duration: t * 0.4 }),
        animate(rot, dir * -12, { duration: t }),
      ]);
      if (!alive()) return;
      // and down onto the new perch
      animate(sy, 1.06, { duration: t * 0.6 });
      animate(sx, 0.95, { duration: t * 0.6 });
      await Promise.all([
        animate(y, to, { duration: t, ease: [0.55, 0, 0.9, 0.45] }),
        animate(x, 0, { duration: t, ease: 'easeIn' }),
        animate(rot, dir * 6, { duration: t }),
      ]);
      if (!alive()) return;
      setAir(false);
      // land: squash, then wobble back to shape
      await Promise.all([
        animate(sy, 0.72, { duration: 0.07, ease: 'easeOut' }),
        animate(sx, 1.24, { duration: 0.07, ease: 'easeOut' }),
      ]);
      if (!alive()) return;
      animate(sy, 1, { type: 'spring', stiffness: 520, damping: 9 });
      animate(sx, 1, { type: 'spring', stiffness: 520, damping: 9 });
      animate(rot, 0, { type: 'spring', stiffness: 300, damping: 10 });
    },
    [x, y, sx, sy, rot],
  );

  // Watch which section you are in; hop when it changes.
  useEffect(() => {
    if (reduce) return;
    let sections = findSections();
    let frame = 0;
    const check = () => {
      frame = 0;
      setShown(window.scrollY > 240);
      const line = window.innerHeight * 0.45;
      let i = 0;
      sections.forEach((s, k) => {
        if (s.getBoundingClientRect().top <= line) i = k;
      });
      const n = sections.length;
      if (hop.current.index === -1) {
        hop.current = { ...hop.current, index: i, n };
        y.set(perchY(i, n));
      } else if (i !== hop.current.index || n !== hop.current.n) {
        hop.current.index = i;
        hop.current.n = n;
        jumpTo(i, n);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const onResize = () => {
      sections = findSections();
      y.set(perchY(hop.current.index < 0 ? 0 : hop.current.index, sections.length));
      onScroll();
    };
    // Sections can mount late (client pieces), so look again shortly.
    const late = setTimeout(onResize, 800);
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(late);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [reduce, jumpTo, y]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      lookX.set((dx / d) * MAX_LOOK * k);
      lookY.set((dy / d) * MAX_LOOK * 0.8 * k);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, lookX, lookY]);

  // A blink every few seconds, never on a fixed beat.
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2600 + Math.random() * 3200);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });

  const face = (
    <svg viewBox="9 6 50 52" className="h-full w-full overflow-visible" aria-hidden="true">
      <path d="M32.8 10.3c.4-.6 1.3-.6 1.7 0l1.2 1.9c.4.7 0 1.5-.8 1.5h-2.5c-.8 0-1.3-.9-.8-1.5z" fill="#FFD700" />
      <path
        d="M16.6 20.9c8.9-12.6 30.5-8.7 34.9-.3 3.5 3.5 3.7 10.2 3.7 10.2s3.6 7.1 2.2 10.6C55.8 56.8 13.9 57 11.3 41.4c-1.4-4.3 2.1-10 2.1-10s-.4-4.1 3.2-10.5z"
        fill="#FFD700"
      />
      <ellipse cx="49" cy="39.3" rx="2.4" ry="1.9" transform="rotate(-22 49 39.3)" fill="#FFB800" opacity={air ? 0.8 : 0.45} />
      <ellipse cx="19" cy="39.3" rx="2.4" ry="1.9" transform="rotate(16 19 39.3)" fill="#FFB800" opacity={air ? 0.7 : 0.35} />
      <motion.g
        style={{ x: eyeX, y: eyeY, transformOrigin: '34px 33.6px', transformBox: 'view-box' }}
        animate={{ scaleY: blink && !air ? 0.12 : 1, scale: air ? 1.15 : 1 }}
        transition={{ duration: 0.08 }}
      >
        <ellipse cx="25.15" cy="33.64" rx="2.6" ry="3.6" fill="#1A1A1A" />
        <ellipse cx="43.6" cy="33.64" rx="2.6" ry="3.6" fill="#1A1A1A" />
        <circle cx="26" cy="32.2" r="0.85" fill="#fff" />
        <circle cx="44.45" cy="32.2" r="0.85" fill="#fff" />
      </motion.g>
      {air ? (
        <ellipse cx="34.6" cy="44" rx="3.2" ry="3.4" fill="#1A1A1A" />
      ) : (
        <path d="M26 41.7s2.1 4.7 8.8 4.7c6.2 0 8.5-4.7 8.5-4.7" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );

  if (reduce) {
    return (
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-40 h-12 w-12 transition-opacity"
        style={{ opacity: shown ? 1 : 0, pointerEvents: shown ? 'auto' : 'none' }}
      >
        {face}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="group fixed right-3 top-0 z-40 h-12 w-12 cursor-pointer sm:right-5 sm:h-14 sm:w-14"
      style={{ y, x, pointerEvents: shown ? 'auto' : 'none' }}
      initial={false}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* shadow on the perch: shrinks while it is in the air */}
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1 left-1/2 h-1.5 w-9 -translate-x-1/2 rounded-full bg-black/15 blur-[1px]"
        animate={{ scaleX: air ? 0.4 : 1, opacity: air ? 0.3 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-full w-full"
        style={{ scaleX: sx, scaleY: sy, rotate: rot, transformOrigin: '50% 100%' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* idle breathing while perched */}
        <motion.span
          className="block h-full w-full"
          style={{ transformOrigin: '50% 100%' }}
          animate={air ? { scaleY: 1, y: 0 } : { scaleY: [1, 1.04, 1], y: [0, -1.5, 0] }}
          transition={air ? { duration: 0.1 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {face}
        </motion.span>
      </motion.span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[12px] text-bg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        Back to top
      </span>
    </motion.button>
  );
}
