'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// "Built for developers" accordion: one item open at a time, and the picture on
// the left shows that item. Every claim here is what the kit does today.

const ITEMS = [
  {
    title: 'Non-custodial by design',
    body: 'Each key is split into three shares: device, server and recovery. Any two sign, and only inside an attested Intel TDX enclave, for the moment it takes. No one holds a whole key, us included.',
  },
  {
    title: 'Verified, not trusted',
    body: 'Before a client trusts a signer, it checks a signed enclave manifest against keys pinned in the SDK and reads the measurements from the Intel-verified quote.',
  },
  {
    title: 'An SDK for every stack',
    body: 'Web and React, React Native and Expo, native iOS and Android, and server SDKs in Node, Python and Rust that share one contract.',
  },
  {
    title: 'One account, one dashboard',
    body: 'Wallets, gas sponsorship and RPC keys live in one project, with usage, team roles and billing next to them.',
  },
];

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-line bg-card p-4 text-[13px] text-muted shadow-soft ${className}`}>{children}</div>
);

function Shares() {
  const shares = [
    { name: 'Device', note: 'On the phone or browser', on: true },
    { name: 'Server', note: 'Encrypted at rest', on: true },
    { name: 'Recovery', note: 'Sealed by the enclave', on: false },
  ];
  return (
    <div className="w-full max-w-[320px] space-y-3">
      {shares.map((s) => (
        <Card key={s.name} className={`flex items-center gap-3 ${s.on ? '' : 'opacity-55'}`}>
          <span className={`grid h-9 w-9 place-items-center rounded-lg ${s.on ? 'bg-gold text-black' : 'bg-bg-2 text-faint'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" />
            </svg>
          </span>
          <span className="flex-1">
            <span className="block font-medium text-ink">{s.name} share</span>
            {s.note}
          </span>
          {s.on && <span className="text-[11.5px] text-gold-ink">signing</span>}
        </Card>
      ))}
      <p className="pt-1 text-center text-[12.5px] text-faint">2 of 3 meet inside the enclave · the key never leaves it</p>
    </div>
  );
}

function Verify() {
  const rows = ['Manifest signature matches pinned keys', 'Intel quote verified', 'OS measurements approved', 'App compose hash approved', 'Event log replays to RTMR3'];
  return (
    <Card className="w-full max-w-[340px] p-5">
      <p className="mb-4 text-[14px] font-medium text-ink">Enclave check</p>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r} className="flex items-center gap-2.5">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
            {r}
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-line pt-3 text-[12px] text-faint">Run by every SDK before a session opens</p>
    </Card>
  );
}

function Stacks() {
  const sdks = [
    ['decane-connect-kit', 'Web · React'],
    ['decane-connect-kit-expo', 'React Native'],
    ['decane-swift', 'iOS'],
    ['app.decane:decane-kit', 'Android'],
    ['decane-node', 'Node.js'],
    ['decane (PyPI)', 'Python'],
    ['decane (crates.io)', 'Rust'],
  ];
  return (
    <Card className="w-full max-w-[360px] p-0">
      {sdks.map(([pkg, where], i) => (
        <div key={pkg} className={`flex items-center justify-between px-4 py-2.5 ${i ? 'border-t border-line' : ''}`}>
          <code className="font-mono text-[12px] text-ink">{pkg}</code>
          <span className="text-[12px] text-faint">{where}</span>
        </div>
      ))}
    </Card>
  );
}

function Dashboard() {
  const rows = [
    ['Monthly active wallets', '412', '/ 499 free'],
    ['Sponsored sends', '—', 'coming soon'],
    ['RPC requests today', '—', 'coming soon'],
  ];
  return (
    <Card className="w-full max-w-[360px] p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[14px] font-medium text-ink">Northgate</p>
        <span className="rounded-full bg-bg-2 px-2 py-0.5 text-[11px]">Production</span>
      </div>
      {rows.map(([k, v, n]) => (
        <div key={k} className="flex items-baseline justify-between border-t border-line py-3">
          <span>{k}</span>
          <span>
            <span className="text-[16px] text-ink">{v}</span> <span className="text-[11.5px] text-faint">{n}</span>
          </span>
        </div>
      ))}
      <div className="mt-2 flex -space-x-2">
        {['A', 'K', 'T'].map((c) => (
          <span key={c} className="grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-gold-soft text-[11px] text-gold-ink">
            {c}
          </span>
        ))}
        <span className="pl-4 text-[12px] leading-7 text-faint">3 teammates</span>
      </div>
    </Card>
  );
}

const ART = [Shares, Verify, Stacks, Dashboard];

export default function Pillars() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const Art = ART[open]!;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <div className="panel-warm dots-none relative flex h-[440px] items-center justify-center overflow-hidden rounded-2xl px-6 md:h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={open}
            className="flex w-full justify-center"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Art />
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <h2 className="h-display text-[36px] md:text-[48px]">
          <span className="soft">Built for developers.</span>
          <br />
          Careful with keys.
        </h2>
        <ul className="mt-10">
          {ITEMS.map((it, i) => {
            const on = i === open;
            return (
              <li key={it.title}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={on}
                  className={`w-full py-3 text-left text-[20px] tracking-[-0.01em] transition-colors md:text-[22px] ${on ? 'text-ink' : 'text-faint hover:text-muted'}`}
                >
                  {it.title}
                </button>
                <div className={`grid transition-all duration-300 ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <p className="overflow-hidden pb-3 text-[14.5px] leading-relaxed text-muted md:max-w-md">{it.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
