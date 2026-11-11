import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components';
import Footer from '@/components/shared/Footer';
import Reveal from '@/components/home/Reveal';
import Switcher from '@/components/home/Switcher';
import Products from '@/components/home/ProductGrid';
import { PRODUCTS } from '@/components/home/products';
import { Glyph } from '@/components/home/bits';
import { KIT, STORE } from '@/components/home/links';
import Peg from '@/images/decane-peg.png';

const FACTS = [
  { k: '4', v: 'products, one account' },
  { k: '3', v: 'chain families: EVM, Solana, Tron' },
  { k: '2 of 3', v: 'key shares to sign, never one' },
];

const FLOW = [
  { who: 'A person', does: 'holds, swaps and sends with', product: 'Decane Wallet' },
  { who: 'An app', does: 'gives every user a wallet at sign-in with', product: 'Connect Kit' },
  { who: 'Their users', does: 'send without holding gas thanks to', product: 'Gas sponsorship' },
  { who: 'Everything', does: 'reads and writes the chain through', product: 'Decane RPC' },
];

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Header />

      {/* Hero: the company, with every product on stage in turn */}
      <header className="relative px-4 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-gold/25 blur-[140px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.02fr] lg:gap-12">
          <Reveal className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-plusJakartaSans text-[13px] font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              One company, four products
            </span>
            <h1 className="mt-7 font-plusJakartaSans text-[46px] font-semibold leading-[0.98] tracking-[-0.04em] text-ink sm:text-[60px] lg:text-[72px]">
              The wallet for people.{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">The rails</span>
                <span className="absolute inset-x-0 bottom-[0.08em] z-0 h-[0.32em] rounded-sm bg-gold/70" aria-hidden="true" />
              </span>{' '}
              for apps.
            </h1>
            <p className="mt-7 max-w-lg font-plusJakartaSans text-[17px] leading-relaxed text-muted md:text-[18px]">
              Decane makes a self-custody wallet anyone can use, and the infrastructure underneath it for builders: wallets behind
              a sign-in, gas nobody has to hold, and node access from one URL.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#products"
                className="rounded-full bg-ink px-7 py-3.5 text-center font-plusJakartaSans text-[15px] font-semibold text-bg transition-opacity hover:opacity-85"
              >
                Explore the products
              </Link>
              <Link
                href={`${KIT}/docs`}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-line bg-card px-7 py-3.5 text-center font-plusJakartaSans text-[15px] font-semibold text-ink transition-colors hover:border-ink"
              >
                Read the docs
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
              {FACTS.map((f) => (
                <div key={f.v}>
                  <dt className="font-plusJakartaSans text-[26px] font-semibold tracking-tight text-ink">{f.k}</dt>
                  <dd className="mt-1 font-plusJakartaSans text-[12.5px] leading-snug text-faint">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="min-w-0">
            <Switcher />
          </Reveal>
        </div>
      </header>

      {/* Product index: a row of four equal names */}
      <div className="border-y border-line bg-card/60">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <li key={p.id} className={`border-line ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}>
              <Link href={`#${p.id}`} className="group flex items-center gap-3 px-5 py-5 transition-colors hover:bg-gold-soft md:px-6">
                <span className="text-gold-ink">
                  <Glyph d={p.icon} size={18} />
                </span>
                <span className="font-plusJakartaSans text-[14.5px] font-semibold text-ink">{p.name}</span>
                <span className="ml-auto text-faint transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <main className="mx-auto max-w-6xl px-4">
        <section className="pt-24 md:pt-32">
          <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 className="font-plusJakartaSans text-[38px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink md:text-[56px]">
              Four products.
              <br />
              <span className="text-faint">Use one, or all of them.</span>
            </h2>
            <p className="max-w-md font-plusJakartaSans text-[17px] leading-relaxed text-muted md:justify-self-end">
              Each stands on its own. Together they share an account, a dashboard and the same care for keys: nothing signs
              unless two of three shares meet inside an attested enclave.
            </p>
          </Reveal>
          <Products />
        </section>

        {/* How the four fit together */}
        <section className="py-24 md:py-32">
          <Reveal>
            <p className="font-plusJakartaSans text-[13px] font-semibold uppercase tracking-[0.12em] text-gold-ink">How it fits</p>
            <h2 className="mt-4 max-w-3xl font-plusJakartaSans text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-[48px]">
              From a person&apos;s first wallet to an app&apos;s millionth transaction
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {FLOW.map((f, i) => (
              <Reveal key={f.product} delay={i * 0.07} className="h-full">
                <li className="relative flex h-full flex-col rounded-[24px] border border-line bg-card p-6">
                  <span className="font-plusJakartaSans text-[13px] font-semibold text-faint">0{i + 1}</span>
                  <p className="mt-8 font-plusJakartaSans text-[19px] leading-snug text-muted">
                    <span className="font-semibold text-ink">{f.who}</span> {f.does}
                  </p>
                  <Link
                    href={`#${PRODUCTS[i]!.id}`}
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-gold-soft px-3 py-1.5 font-plusJakartaSans text-[13.5px] font-semibold text-gold-ink"
                   
                  >
                    {f.product}
                  </Link>
                  {i < FLOW.length - 1 && (
                    <span
                      className="absolute -right-[13px] top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg text-[12px] text-faint md:grid"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Close */}
        <section className="pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[40px] bg-gold px-7 py-16 text-black md:px-16 md:py-20">
              <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/40 blur-3xl" aria-hidden="true" />
              <Image src={Peg} alt="" aria-hidden="true" className="absolute bottom-0 right-6 hidden w-52 md:block lg:right-14 lg:w-64" />
              <div className="relative max-w-2xl">
                <h2 className="font-plusJakartaSans text-[36px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[56px]">
                  Pick where you start
                </h2>
                <p className="mt-5 max-w-xl font-plusJakartaSans text-[17px] leading-relaxed text-black/70">
                  Get the wallet for yourself, or put wallets, gas and RPC inside your own app. Connect Kit is free up to 499
                  monthly active wallets.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={STORE}
                    target="_blank"
                    rel="noopener"
                    className="rounded-full bg-black px-7 py-3.5 text-center font-plusJakartaSans text-[15px] font-semibold text-white transition-colors hover:bg-black/80"
                  >
                    Get the wallet
                  </Link>
                  <Link
                    href={KIT}
                    target="_blank"
                    rel="noopener"
                    className="rounded-full border border-black/25 px-7 py-3.5 text-center font-plusJakartaSans text-[15px] font-semibold text-black transition-colors hover:border-black"
                  >
                    Build with Decane
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
