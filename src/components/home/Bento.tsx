import Link from 'next/link';
import Reveal from './Reveal';
import { PRODUCTS } from './products';
import { Arrow, isExternal } from './bits';

/** The four products as four equal cards, each with its own product surface. */
export default function Bento() {
  return (
    <div id="products" className="grid scroll-mt-24 grid-cols-1 gap-4 md:grid-cols-2">
      {PRODUCTS.map((p, i) => (
        <Reveal key={p.id} delay={(i % 2) * 0.08} className="h-full">
          <article id={p.id} className="panel-soft flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl">
            <div className="p-7 pb-0 md:p-8 md:pb-0">
              <div className="flex items-center gap-2 text-[13px] text-faint">
                <span>{p.name}</span>
                <span aria-hidden="true">·</span>
                <span>{p.audience}</span>
                {p.soon && <span className="ml-auto rounded-full bg-gold-soft px-2.5 py-0.5 text-[11.5px] text-gold-ink">Coming soon</span>}
              </div>
              <h3 className="mt-4 text-[24px] font-medium leading-tight tracking-[-0.02em] text-ink md:text-[26px]">{p.title}</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{p.line}</p>
            </div>
            <div className="relative flex h-[400px] items-center justify-center overflow-hidden px-5">
              <p.Visual />
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-line px-7 py-4 md:px-8">
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
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
