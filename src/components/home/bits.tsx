export const Glyph = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

export const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Soon = () => (
  <span className="rounded-full bg-gold-soft px-2.5 py-1 font-plusJakartaSans text-[10.5px] font-semibold uppercase tracking-wider text-gold-ink">
    Coming soon
  </span>
);

export const Tick = () => (
  <span className="mt-[3px] grid h-4 w-4 flex-none place-items-center rounded-full bg-gold-soft text-gold-ink">
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  </span>
);

export const isExternal = (href: string) => href.startsWith('http');
