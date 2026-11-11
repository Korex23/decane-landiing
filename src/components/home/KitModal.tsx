import './kit-modal.css';

// The Connect Kit "Log in or sign up" modal exactly as the SDK renders it
// (sdk-web/src/ui: SignInView inside WalletSelector, with Google, email and X
// enabled), as a still picture: nothing here is interactive.

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function DecaneMark({ size = 44, muted = false, id }: { size?: number; muted?: boolean; id: string }) {
  const h = Math.round((size * 64) / 68);
  return (
    <svg width={size} height={h} viewBox="0 0 68 64" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0, opacity: muted ? 0.55 : 1 }}>
      <g filter={`url(#${id})`}>
        <path d="M32.8031 10.2986C33.1971 9.68929 34.0886 9.68929 34.4826 10.2986L35.7297 12.2273C36.1599 12.8926 35.6823 13.7703 34.89 13.7703H32.3957C31.6034 13.7703 31.1257 12.8926 31.556 12.2273L32.8031 10.2986Z" fill="#FFD700" />
        <path d="M16.6095 20.8798C25.5139 8.28662 47.0755 12.2298 51.4641 20.5617C54.9502 24.0479 55.2167 30.8018 55.2167 30.8018C55.2167 30.8018 58.8421 37.862 57.4428 41.3601C55.7891 56.7522 13.9381 57.0066 11.3304 41.3601C9.93111 37.0351 13.4293 31.3744 13.4293 31.3744C13.4293 31.3744 12.9841 27.2404 16.6095 20.8798Z" fill="#FFD700" />
        <ellipse cx="48.9999" cy="39.2669" rx="2.38155" ry="1.89957" transform="rotate(-22.395 48.9999 39.2669)" fill="#FFE55F" fillOpacity="0.45" />
        <ellipse cx="18.9785" cy="39.2671" rx="2.38155" ry="1.89958" transform="rotate(15.8893 18.9785 39.2671)" fill="#FFE55F" fillOpacity="0.26" />
        <path d="M43.5977 30.7344C43.1619 30.7344 42.6943 30.9653 42.3027 31.4824C41.9107 32.0001 41.6388 32.7597 41.6387 33.6406C41.6387 34.5217 41.9107 35.2821 42.3027 35.7998C42.6943 36.3168 43.1619 36.5479 43.5977 36.5479C44.0332 36.5477 44.5002 36.3166 44.8916 35.7998C45.2837 35.2821 45.5557 34.5217 45.5557 33.6406C45.5556 32.7597 45.2836 32.0001 44.8916 31.4824C44.5002 30.9656 44.0333 30.7345 43.5977 30.7344Z" fill="#1A1A1A" stroke="#F4EBBC" strokeWidth="2" />
        <path d="M25.1514 30.7344C25.5871 30.7344 26.0547 30.9653 26.4463 31.4824C26.8383 32.0001 27.1103 32.7597 27.1104 33.6406C27.1104 34.5217 26.8384 35.2821 26.4463 35.7998C26.0547 36.3168 25.5871 36.5479 25.1514 36.5479C24.7158 36.5477 24.2489 36.3166 23.8574 35.7998C23.4654 35.2821 23.1934 34.5217 23.1934 33.6406C23.1934 32.7597 23.4654 32.0001 23.8574 31.4824C24.2489 30.9656 24.7157 30.7345 25.1514 30.7344Z" fill="#1A1A1A" stroke="#F4EBBC" strokeWidth="2" />
        <path d="M26.0107 41.6924C26.0107 41.6924 28.0937 46.399 34.759 46.399C41.008 46.399 43.3109 41.6924 43.3109 41.6924" stroke="#1A1A1A" strokeLinecap="round" />
      </g>
      <defs>
        <filter id={id} x="0.589964" y="0.334365" width="66.5809" height="62.9754" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-0.501447" dy="0.401157" />
          <feGaussianBlur stdDeviation="4.95429" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.996078 0 0 0 0 0.996078 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

const GoogleMark = () => (
  <svg width={18} height={18} viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6 1.5 7.4 2.8l5.4-5.3C33.5 3.9 29.2 2 24 2 15.4 2 8 7 4.7 14.2l6.3 4.9C12.6 13.4 17.8 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46 24.5c0-1.6-.1-2.8-.4-4H24v7.5h12.6c-.3 2.2-1.7 5.5-4.9 7.7l6.1 4.7C41.5 37 46 31.4 46 24.5z" />
    <path fill="#FBBC05" d="M11 29.1a13.9 13.9 0 0 1 0-10l-6.3-4.9A22 22 0 0 0 2 24c0 3.5.8 6.9 2.4 9.8L11 29.1z" />
    <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-6.1-4.7c-1.7 1.2-4 2-8.4 2-6.2 0-11.4-4-13.1-9.6l-6.3 4.9C7.9 40.9 15.3 46 24 46z" />
  </svg>
);

const MailIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...line} aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

const XLogo = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WalletLineIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...line} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a1 1 0 0 1 1 1v2" />
    <path d="M4 7.5v9A2.5 2.5 0 0 0 6.5 19H19a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 1 4 7.5z" />
    <circle cx="16" cy="13.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Chevron = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...line} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

const Close = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...line} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const CopyIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" {...line} aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path d="M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
  </svg>
);

/** The same window once signed in: "Your wallet", as SocialWalletModal draws it. */
export function KitWallet({ id = 'kitw', className = 'origin-center scale-[0.78] sm:scale-[0.82]' }: { id?: string; className?: string }) {
  const rows = [
    ['Ethereum and EVM', '0x8f3a91c2…4b7e21', '0.042 ETH'],
    ['Solana', '7xKq2mPd…c9Hn4T', '1.25 SOL'],
  ];
  return (
    <div className={`dk ${className}`} role="img" aria-label="The Connect Kit wallet window after sign-in: an EVM and a Solana address with balances">
      <div className="dcm-card" aria-hidden="true">
        <span className="dcm-icon-btn">
          <Close />
        </span>
        <div className="dcm-body">
          <DecaneMark id={`dkm-${id}`} />
          <h2 className="dcm-title">Your wallet</h2>
          <span className="dcm-status">
            <i /> Unlocked, expires in 7h 58m
          </span>
          <div className="dcm-addresses">
            {rows.map(([label, addr, bal]) => (
              <div key={label} className="dcm-address">
                <div className="dcm-address-main">
                  <span>{label}</span>
                  <code>{addr}</code>
                </div>
                <span className="dcm-balance">{bal}</span>
                <span className="dcm-copy">
                  <CopyIcon />
                </span>
              </div>
            ))}
          </div>
          <div className="dcm-actions">
            <span className="dcm-ghost">Sign out</span>
          </div>
          <div className="dcm-protected">
            <span>Protected by</span>
            <DecaneMark size={14} muted id={`dkp-${id}`} />
            <span className="dcm-wordmark">decane</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KitModal({ id = 'kit', className = 'origin-center scale-[0.78] sm:scale-[0.82]' }: { id?: string; className?: string }) {
  return (
    <div className={`dk ${className}`} role="img" aria-label="The Connect Kit sign-in window: log in or sign up with Google, email or X, or continue with a wallet">
      <div className="dcm-card" aria-hidden="true">
        <span className="dcm-icon-btn">
          <Close />
        </span>
        <div className="dcm-body">
          <DecaneMark id={`dkm-${id}`} />
          <h2 className="dcm-title">Log in or sign up</h2>
          <div className="dcm-methods">
            <div className="dcm-method">
              <GoogleMark />
              <span>Google</span>
            </div>
            <div className="dcm-method dcm-method-input">
              <MailIcon />
              <span className="dcm-placeholder">your@email.com</span>
              <span className="dcm-submit">Submit</span>
            </div>
            <div className="dcm-method">
              <XLogo />
              <span>X</span>
            </div>
          </div>
          <div className="dcm-or">or</div>
          <div className="dcm-methods" style={{ marginTop: 0 }}>
            <div className="dcm-method">
              <WalletLineIcon />
              <span>Continue with a wallet</span>
              <span className="dcm-trail">
                <Chevron />
              </span>
            </div>
          </div>
          <div className="dcm-protected">
            <span>Protected by</span>
            <DecaneMark size={14} muted id={`dkp-${id}`} />
            <span className="dcm-wordmark">decane</span>
          </div>
        </div>
      </div>
    </div>
  );
}
