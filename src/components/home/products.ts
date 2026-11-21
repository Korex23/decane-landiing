import type { ReactElement } from 'react';
import { WalletVisual, KitVisual, PaymentsVisual, GasVisual, RpcVisual } from './Visuals';
import { STORE, KIT, DISCORD } from './links';

// The Decane products, in one list so every place that shows them (the hero
// switcher, the product grid, the nav and the footer) gives each the same
// weight. All are live (payments in early access); gas sponsorship leads with what developers earn
// on it, as kit.decane.app/gas-sponsorship does.

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
    id: 'payments',
    name: 'Payments',
    short: 'Payments',
    audience: 'For builders',
    line: 'Get paid in any token. Receive USDC.',
    title: 'Take crypto payments, settled in USDC',
    body: 'Create a checkout from your server and send the link. Customers pay in whatever they hold, on the network they hold it on; you receive USDC at your address and a signed webhook. Customers with a Decane wallet just approve.',
    points: ['Any token Dextopus routes, across chains', 'Settled as USDC to your own address', 'A hosted checkout page, or embed it', 'Refunds come to you, never lost'],
    cta: { label: 'Read more', href: `${KIT}/payments` },
    more: { label: 'Turn it on in the dashboard', href: 'https://dashboard.decane.app' },
    icon: 'M3 7h18v10H3zM3 11h18M7 15h3',
    Visual: PaymentsVisual,
  },
  {
    id: 'gas',
    name: 'Gas sponsorship',
    short: 'Gas',
    audience: 'For builders',
    line: 'Users send without gas. You earn on every send.',
    title: 'Sponsor gas, and earn on it',
    body: 'Your users never need ETH: they pay the network fee in USDC with your markup on top, and that markup is paid to your wallet on-chain with every send. Or cover the fee yourself from a prepaid gas tank.',
    points: ['Your markup on every token-paid send, up to 50%', 'Paid to your wallet on-chain, each transaction', 'Prepaid gas tank, topped up in USDC', 'Caps per send, per user and per day'],
    cta: { label: 'Read more', href: `${KIT}/gas-sponsorship` },
    more: { label: 'Turn it on in the dashboard', href: 'https://dashboard.decane.app' },
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
    more: { label: 'Get an RPC key', href: 'https://dashboard.decane.app' },
    icon: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
    Visual: RpcVisual,
  },
];

