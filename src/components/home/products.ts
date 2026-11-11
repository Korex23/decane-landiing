import type { ReactElement } from 'react';
import { WalletVisual, KitVisual, GasVisual, RpcVisual } from './Visuals';
import { STORE, KIT, DISCORD } from './links';

// The four Decane products, in one list so every place that shows them (the
// hero switcher, the product grid, the nav and the footer) gives each the same
// weight. Gas sponsorship and RPC are not released yet and say so, as
// kit.decane.app does.

export type Product = {
  id: string;
  name: string;
  short: string;
  audience: string;
  line: string;
  title: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
  more: { label: string; href: string };
  soon?: boolean;
  icon: string;
  Visual: () => ReactElement;
};

export const PRODUCTS: Product[] = [
  {
    id: 'wallet',
    name: 'Decane Wallet',
    short: 'Wallet',
    audience: 'For people',
    line: 'A self-custody wallet that feels like your bank app.',
    title: 'Crypto without the jargon',
    body: 'Send, receive, swap and bridge across chains, connect to any dApp, and recover with a passkey when a device is lost. Made for people new to crypto, with everything the experienced expect.',
    points: ['Send, swap and bridge in one place', 'Any dApp through WalletConnect', 'Recover with a passkey or seed phrase', 'Anti-phishing checks built in'],
    cta: { label: 'Add to Chrome', href: STORE },
    more: { label: 'Join the community', href: DISCORD },
    icon: 'M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 12h.01',
    Visual: WalletVisual,
  },
  {
    id: 'connect-kit',
    name: 'Connect Kit',
    short: 'Connect Kit',
    audience: 'For builders',
    line: 'Wallets for your users, behind the sign-in they already use.',
    title: 'Every sign-in becomes a wallet',
    body: 'Your users sign in with Google, email, phone or X and get a wallet on EVM, Solana and Tron from one key. They never see a seed phrase, and neither do you.',
    points: ['Non-custodial: the key is split three ways', 'Rebuilt only inside an attested enclave to sign', 'Web, React Native, iOS and Android SDKs', 'Free up to 499 monthly active wallets'],
    cta: { label: 'Explore Connect Kit', href: KIT },
    more: { label: 'Read the docs', href: `${KIT}/docs` },
    icon: 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5zM12 15v2',
    Visual: KitVisual,
  },
  {
    id: 'gas',
    name: 'Gas sponsorship',
    short: 'Gas',
    audience: 'For builders',
    line: 'Your users send without ever holding gas.',
    title: 'Nobody needs ETH to press send',
    body: 'Cover the network fee for your users, or let them pay it in USDC. They confirm and it lands, from the same wallet and the same address.',
    points: ['Your project pays, or the user pays in a token', 'Caps per user and per day', 'Only the contracts you allow', 'Contracts pinned in the SDK'],
    cta: { label: 'Read more', href: `${KIT}/gas-sponsorship` },
    more: { label: 'Ask for early access', href: 'mailto:info@decane.app' },
    soon: true,
    icon: 'M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z',
    Visual: GasVisual,
  },
  {
    id: 'rpc',
    name: 'Decane RPC',
    short: 'RPC',
    audience: 'For builders',
    line: 'Node access from one URL, next to your wallets.',
    title: 'Read and write the chain from one URL',
    body: 'An endpoint that works anywhere an Ethereum RPC does: viem, ethers, wagmi, Hardhat and Foundry. Keys, limits and usage live in the same dashboard as your wallets.',
    points: ['Base first, more EVM chains to follow', 'Free plan at 20 requests a second', 'Usage per day and per method', 'Keys shown once and stored hashed'],
    cta: { label: 'Read more', href: `${KIT}/rpc` },
    more: { label: 'Ask for early access', href: 'mailto:info@decane.app' },
    soon: true,
    icon: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
    Visual: RpcVisual,
  },
];

