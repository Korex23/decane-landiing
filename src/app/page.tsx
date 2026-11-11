import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components';
import Footer from '@/components/shared/Footer';
import Reveal from '@/components/home/Reveal';
import Bento from '@/components/home/Bento';
import Pillars from '@/components/home/Pillars';
import KitModal from '@/components/home/KitModal';
import { Chip } from '@/components/home/Visuals';
import { KIT, STORE } from '@/components/home/links';
import WalletUI from '@/images/wallet-ui.png';

const STACKS = ['React', 'React Native', 'iOS', 'Android', 'Node.js', 'Python', 'Rust'];

const NUMBERS = [
  { k: '4', v: 'products on one account' },
  { k: '7', v: 'SDKs, web to server' },
  { k: '3', v: 'chain families: EVM, Solana, Tron' },
  { k: '2 of 3', v: 'key shares needed to sign' },
];

const Ok = () => (
  <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-emerald-500 text-white">
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  </span>
);

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Header />

      {/* Hero: copy left, the products on a warm panel right */}
      <header className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-28 md:pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <Reveal className="min-w-0">
          <h1 className="h-display text-[44px] sm:text-[56px] lg:text-[62px]">
            Put crypto in everyone&apos;s hands
            <br />
            <span className="soft">with wallets, gas and RPC</span>
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
            A self-custody wallet for people, and the same rails for apps: wallets behind a sign-in, gas nobody has to hold,
            and node access from one URL.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#products" className="rounded-full bg-ink px-5 py-2.5 text-[14.5px] text-bg transition-opacity hover:opacity-85">
              Get started
            </Link>
            <Link
              href={`${KIT}/docs`}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-ink/80 px-5 py-2.5 text-[14.5px] text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              Read the docs
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="min-w-0">
          <div className="panel-warm relative h-[460px] overflow-hidden rounded-2xl sm:h-[540px]">
            <Image
              src={WalletUI}
              alt="The Decane Wallet home screen"
              priority
              className="absolute bottom-[2%] left-[-8%] w-[78%] max-w-[520px] sm:left-[-5%] sm:w-[68%]"
            />
            <div className="absolute right-[-14%] top-[54%] -translate-y-1/2 sm:right-[-3%]">
              <KitModal id="hero" />
            </div>
            <Chip className="absolute left-[6%] top-[7%] animate-[float_6s_ease-in-out_infinite]">
              <Ok /> Sent 25 USDC · gas paid by Northgate
            </Chip>
          </div>
        </Reveal>
      </header>

      {/* SDK strip */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="text-center text-[13px] text-faint">SDKs for the stack you already use</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {STACKS.map((s) => (
            <li key={s} className="text-[19px] font-medium tracking-[-0.02em] text-faint md:text-[21px]">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <div className="seam" aria-hidden="true" />

      {/* Products */}
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:pt-20">
        <Reveal>
          <h2 className="h-display max-w-3xl text-[34px] md:text-[44px]">
            Four products for onchain apps
            <br />
            <span className="soft">and the people who use them</span>
          </h2>
        </Reveal>
        <div className="mt-12">
          <Bento />
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-bg-2">
        <div className="seam" aria-hidden="true" />
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-14 md:grid-cols-4">
          {NUMBERS.map((n) => (
            <Reveal key={n.v} className="text-center">
              <dt className="text-[44px] font-normal tracking-[-0.04em] text-ink md:text-[52px]">{n.k}</dt>
              <dd className="mt-1 text-[13.5px] text-muted">{n.v}</dd>
            </Reveal>
          ))}
        </dl>
        <div className="seam" aria-hidden="true" />
      </section>

      {/* Developers */}
      <section id="developers" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
        <Pillars />
      </section>

      {/* Close */}
      <section className="bg-bg-2">
        <div className="seam" aria-hidden="true" />
        <Reveal className="mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <h2 className="h-display text-[38px] md:text-[54px]">
            Start building in minutes
            <br />
            <span className="soft">or get the wallet today</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-muted">
            Connect Kit is free up to 499 monthly active wallets. Gas sponsorship and Decane RPC join the same account as they
            ship.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={KIT} target="_blank" rel="noopener" className="rounded-full bg-ink px-5 py-2.5 text-[14.5px] text-bg transition-opacity hover:opacity-85">
              Start building
            </Link>
            <Link
              href={STORE}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-ink/80 px-5 py-2.5 text-[14.5px] text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              Get the wallet
            </Link>
          </div>
        </Reveal>
        <div className="seam" aria-hidden="true" />
      </section>

      <Footer />
    </div>
  );
}
