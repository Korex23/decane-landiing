import Image from 'next/image';
import WalletUI from '@/images/wallet-ui.png';
import { KitWallet } from './KitModal';

// One product surface per product, all in the same frame so they read as
// equals: the wallet, a Connect Kit sign-in, a checkout, a sponsored payment and RPC usage.
// Colours come from the theme tokens, so each works in light and dark.

const Win = ({ title, right, children }: { title: React.ReactNode; right?: React.ReactNode; children: React.ReactNode }) => (
  <div className="w-full max-w-[330px] overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
    <div className="flex items-center justify-between border-b border-line px-4 py-3">
      <span className="flex items-center gap-2 font-plusJakartaSans text-[13px] font-semibold text-ink">{title}</span>
      {right}
    </div>
    <div className="space-y-3 p-4 font-plusJakartaSans text-[13px] text-muted">{children}</div>
  </div>
);



export function WalletVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center">
      <Image src={WalletUI} alt="The Decane Wallet home screen" className="w-full scale-[1.3]" />
    </div>
  );
}

export function KitVisual() {
  return <KitWallet />;
}

export function GasVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[340px] flex-col items-center">
      <Win title="Confirm payment">
        <div className="py-1 text-center">
          <div className="text-[34px] font-semibold tracking-tight text-ink">
            25.00 <span className="text-[15px] font-medium text-faint">USDC</span>
          </div>
        </div>
        {[
          ['To', 'shop.base.eth'],
          ['Network', 'Base'],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-line pb-2.5">
            <span className="text-faint">{k}</span>
            <span className="text-ink">{v}</span>
          </div>
        ))}
        <div className="flex items-start justify-between">
          <span className="text-faint">Network fee</span>
          <span className="text-right">
            <span className="font-semibold text-ink">0.12 USDC</span>
            <span className="mt-1 block text-[11px] text-faint">No ETH needed</span>
          </span>
        </div>
        <div className="rounded-xl bg-gold py-2.5 text-center font-semibold text-black">Confirm</div>
      </Win>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[12.5px] text-ink shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Northgate earned <b className="font-semibold">0.02 USDC</b> on this send
      </div>
    </div>
  );
}

export function PaymentsVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[340px] flex-col items-center">
      <Win
        title={
          <>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-[10px] font-bold text-gold-ink">N</span>
            Pay Northgate
          </>
        }
        right={<span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10.5px] font-semibold text-gold-ink">9:41</span>}
      >
        <div className="py-1 text-center">
          <div className="text-[34px] font-semibold tracking-tight text-ink">
            25.00 <span className="text-[15px] font-medium text-faint">USDC</span>
          </div>
        </div>
        {[
          ['Pay with', 'SOL on Solana'],
          ['Send exactly', '0.1384 SOL'],
        ].map(([k, val]) => (
          <div key={k} className="flex justify-between border-b border-line pb-2.5">
            <span className="text-faint">{k}</span>
            <span className="text-ink">{val}</span>
          </div>
        ))}
        <div className="flex items-start justify-between">
          <span className="text-faint">You receive</span>
          <span className="text-right">
            <span className="font-semibold text-ink">25.00 USDC</span>
            <span className="mt-1 block text-[11px] text-faint">on Base, to your address</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-[12.5px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Waiting for payment
        </div>
      </Win>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[12.5px] text-ink shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Paid · <b className="font-semibold">25.00 USDC</b> settled to Northgate
      </div>
    </div>
  );
}

export function RpcVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[340px] flex-col items-center">
      <Win
        title="Base mainnet"
        right={
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
          </span>
        }
      >
        <div className="truncate rounded-lg border border-line bg-bg px-3 py-2 font-mono text-[11.5px] text-muted">
          …/rpc/v1/8453/dck_rpc_••••
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-bg p-3">
            <div className="text-[11px] text-faint">Requests · 24h</div>
            <div className="mt-1 text-[20px] font-semibold text-ink">1.28M</div>
          </div>
          <div className="rounded-xl bg-bg p-3">
            <div className="text-[11px] text-faint">Peak</div>
            <div className="mt-1 text-[20px] font-semibold text-ink">
              18<span className="text-[12px] font-medium text-faint">/20 rps</span>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 200 54" preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="rpcFillL" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#FFBC05" stopOpacity="0.35" />
              <stop offset="1" stopColor="#FFBC05" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 44 L14 40 L28 42 L42 33 L56 36 L70 28 L84 31 L98 22 L112 26 L126 17 L140 21 L154 12 L168 16 L182 9 L200 11 L200 54 L0 54 Z" fill="url(#rpcFillL)" />
          <path d="M0 44 L14 40 L28 42 L42 33 L56 36 L70 28 L84 31 L98 22 L112 26 L126 17 L140 21 L154 12 L168 16 L182 9 L200 11" fill="none" stroke="#e0a300" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        </svg>
        {[
          ['eth_call', 62],
          ['eth_getLogs', 21],
          ['eth_blockNumber', 11],
        ].map(([m, n]) => (
          <div key={m} className="grid grid-cols-[110px_1fr_32px] items-center gap-2 text-[11px]">
            <code className="text-ink">{m}</code>
            <span className="h-1.5 rounded-full bg-gold" style={{ width: `${n}%` }} />
            <span className="text-right text-faint">{n}%</span>
          </div>
        ))}
      </Win>
    </div>
  );
}
