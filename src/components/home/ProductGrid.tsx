import Link from 'next/link';
import Reveal from './Reveal';
import { PRODUCTS } from './products';
import { Glyph, Arrow, Soon, Tick, isExternal } from './bits';

/** The four products as equal tiles: same size, same parts, same weight. */
export default function Products() {
  return (
    <div id="products" className="grid scroll-mt-28 grid-cols-1 gap-5 lg:grid-cols-2">
      {PRODUCTS.map((p, i) => (
        <Reveal key={p.id} delay={(i % 2) * 0.08} className="h-full">
          <article id={p.id} className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[32px] border border-line bg-card">
            <div className="p-7 pb-0 md:p-9 md:pb-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft text-gold-ink">
                    <Glyph d={p.icon} />
                  </span>
                  <div>
                    <p className="font-plusJakartaSans text-[15px] font-semibold text-ink">{p.name}</p>
                    <p className="font-plusJakartaSans text-[12.5px] text-faint">{p.audience}</p>
                  </div>
                </div>
                {p.soon && <Soon />}
              </div>
              <h3 className="mt-7 font-plusJakartaSans text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[32px]">
                {p.title}
              </h3>
              <p className="mt-3 font-plusJakartaSans text-[15.5px] leading-relaxed text-muted">{p.body}</p>
            </div>

            <div className="dots mx-4 mt-7 flex h-[380px] items-center justify-center overflow-hidden rounded-[24px] bg-bg-2/70 px-5 md:mx-5">
              <p.Visual />
            </div>

            <div className="flex flex-1 flex-col p-7 md:p-9">
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 font-plusJakartaSans text-[14px] leading-snug text-ink/85">
                    <Tick />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <Link
                  href={p.cta.href}
                  {...(isExternal(p.cta.href) ? { target: '_blank', rel: 'noopener' } : {})}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-plusJakartaSans text-[14.5px] font-semibold text-bg transition-opacity hover:opacity-85"
                >
                  {p.cta.label} <Arrow />
                </Link>
                <Link
                  href={p.more.href}
                  {...(isExternal(p.more.href) ? { target: '_blank', rel: 'noopener' } : {})}
                  className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 font-plusJakartaSans text-[14.5px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  {p.more.label}
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
