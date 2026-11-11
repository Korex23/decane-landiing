import Image from 'next/image';
import WalletUI from '@/images/wallet-ui.png';
import KitModal from './KitModal';
import { Chip } from './Visuals';

// The hero picture: the Connect Kit sign-in opening over an app in a browser,
// as it does in a real integration, with the Decane Wallet in front and the
// gas and RPC products signalling around it. One scene, all four products.

const Ok = () => (
  <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-emerald-500 text-white">
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  </span>
);

const Bar = ({ w, className = '' }: { w: string; className?: string }) => <span className={`block h-2.5 rounded-full bg-ink/10 ${className}`} style={{ width: w }} />;

export default function HeroScene() {
  return (
    <div className="panel-warm relative h-[480px] overflow-hidden rounded-3xl sm:h-[560px]">
      {/* The app, in a browser */}
      <div className="absolute left-[7%] right-[-6%] top-[9%] bottom-[-4%] overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-3 flex h-7 flex-1 items-center rounded-lg bg-bg-2 px-3 text-[12px] text-faint">northgate.app/checkout</span>
        </div>
        <div className="relative h-full">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-ink text-[11px] font-bold text-bg">N</span>
              Northgate
            </span>
            <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] text-bg">Sign in</span>
          </div>
          <div className="grid grid-cols-[1.3fr_1fr] gap-5 px-6">
            <div className="space-y-3">
              <div className="h-36 rounded-xl bg-bg-2" />
              <Bar w="70%" />
              <Bar w="45%" />
            </div>
            <div className="space-y-3 rounded-xl border border-line p-4">
              <Bar w="60%" />
              <Bar w="85%" />
              <Bar w="40%" />
              <span className="mt-4 block h-9 rounded-lg bg-gold/70" />
            </div>
          </div>
          {/* the modal's own backdrop */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* The real Connect Kit sign-in, over the app */}
      <div className="absolute left-[56%] top-[54%] -translate-x-1/2 -translate-y-1/2">
        <KitModal id="hero" className="origin-center scale-[0.74] sm:scale-[0.8]" />
      </div>

      {/* The Decane Wallet */}
      <Image
        src={WalletUI}
        alt="The Decane Wallet home screen"
        priority
        className="absolute bottom-[-6%] left-[-16%] w-[62%] max-w-[420px] drop-shadow-2xl sm:left-[-12%] sm:w-[52%]"
      />

      {/* Gas and RPC, at work */}
      <Chip className="absolute right-[5%] top-[4%] animate-[float_6s_ease-in-out_infinite]">
        <Ok /> Gas paid by Northgate
      </Chip>
      <Chip className="absolute bottom-[6%] right-[5%] animate-[float_7s_ease-in-out_infinite_-2s]">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> RPC · Base · 18 req/s
      </Chip>
    </div>
  );
}
