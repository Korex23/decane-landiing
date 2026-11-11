import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components';
import Footer from '@/components/shared/Footer';
import Reveal from '@/components/home/Reveal';
import ProductRail from '@/components/home/ProductRail';
import Pillars from '@/components/home/Pillars';
import HeroScene from '@/components/home/HeroScene';
import CodeTabs from '@/components/home/CodeTabs';
import MascotBuddy from '@/components/home/MascotBuddy';
import { PRODUCTS } from '@/components/home/products';
import { KIT, STORE } from '@/components/home/links';
import Peg from '@/images/decane-peg.png';

const STACKS = ['React', 'React Native', 'iOS', 'Android', 'Node.js', 'Python', 'Rust'];

const TRUST = ['Non-custodial', '2-of-3 key shares', 'Attested enclave', 'EVM, Solana, Tron'];

const STEPS = [
  { title: 'Create a project', body: 'Sign up, create a project and copy its key. Free up to 499 monthly active wallets.' },
  { title: 'Drop in the SDK', body: 'One provider on the web, one client on mobile, one line to verify tokens on your server.' },
  { title: 'Go live', body: 'Your users sign in the way they already do and leave with a wallet. Add gas and RPC to the same project as they ship.' },
];

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Header />
      <MascotBuddy />

      {/* Hero */}
      <header className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 pt-28 md:pt-32 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal className="min-w-0">
          <h1 className="h-display text-[44px] sm:text-[56px] lg:text-[52px] xl:text-[60px]">
            <span className="block text-balance lg:whitespace-nowrap">Wallets for everyone.</span>
            <span className="soft block text-balance lg:whitespace-nowrap">Rails for every app.</span>
          </h1>
          <p className="mt-6 max-w-[30rem] text-[17px] leading-relaxed text-muted md:text-[18px]">
            Decane is a self-custody wallet for people, and the infrastructure under it for builders: wallets behind any
            sign-in, gas nobody has to hold, and node access from one URL.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={KIT} target="_blank" rel="noopener" className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-85">
              Start building
            </Link>
            <Link
              href={STORE}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-ink/80 px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              Get the wallet
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="text-gold-ink" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="min-w-0">
          <HeroScene />
        </Reveal>
      </header>

      {/* SDK strip */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:py-20">
        <p className="text-center text-[13px] text-faint">SDKs for the stack you already use</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {STACKS.map((s) => (
            <li key={s} className="text-[19px] font-semibold tracking-[-0.02em] text-faint md:text-[21px]">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <div className="seam" aria-hidden="true" />

      {/* Products: pinned horizontal scroll */}
      <ProductRail />

      {/* Code */}
      <section className="relative overflow-hidden bg-[#0d0c09] text-[#f5f2ea]">
        <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[#ffbc05]/10 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="h-display text-[34px] md:text-[46px]">
              Live this afternoon
              <br />
              <span className="text-white/45">not next quarter</span>
            </h2>
            <ol className="mt-10 space-y-7">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-white/15 text-[13px] text-[#ffbc05]">{i + 1}</span>
                  <div>
                    <p className="text-[17px] font-medium">{s.title}</p>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-white/60">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href={`${KIT}/docs`} target="_blank" rel="noopener" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#ffbc05] px-5 py-2.5 text-[14.5px] font-medium text-black transition-opacity hover:opacity-90">
              Read the quick start →
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <CodeTabs />
          </Reveal>
        </div>
      </section>

      {/* Developers */}
      <section id="developers" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 py-24 md:py-32">
        <Pillars />
      </section>

      {/* Close */}
      <section className="mx-auto max-w-[1320px] px-5 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-gold px-7 py-14 text-black md:px-14 md:py-20">
            <div className="pointer-events-none absolute -right-20 -top-28 h-[420px] w-[420px] rounded-full bg-white/45 blur-3xl" aria-hidden="true" />
            <Image src={Peg} alt="" aria-hidden="true" className="absolute bottom-0 right-6 hidden w-56 md:block lg:right-14 lg:w-64" />
            <div className="relative max-w-xl">
              <h2 className="text-[36px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[54px]">Pick where you start</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-black/70">
                Build wallets, gas and RPC into your app, or get the Decane Wallet for yourself. Connect Kit is free up to 499
                monthly active wallets.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={KIT} target="_blank" rel="noopener" className="rounded-full bg-black px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-black/80">
                  Start building
                </Link>
                <Link href={STORE} target="_blank" rel="noopener" className="rounded-full border border-black/25 px-6 py-3 text-[15px] font-medium text-black transition-colors hover:border-black">
                  Get the wallet
                </Link>
              </div>
              <ul className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-black/75">
                {PRODUCTS.map((p) => (
                  <li key={p.id}>
                    <Link href={p.cta.href} target="_blank" rel="noopener" className="underline decoration-black/25 underline-offset-4 hover:decoration-black">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
