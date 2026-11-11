import Image from 'next/image';
import Link from 'next/link';
import logo from '@/svgs/logo.svg';
import { STORE, DISCORD, KIT } from '@/components/home/links';

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { text: 'Decane Wallet', href: STORE },
      { text: 'Connect Kit', href: KIT },
      { text: 'Gas sponsorship', href: `${KIT}/gas-sponsorship` },
      { text: 'Decane RPC', href: `${KIT}/rpc` },
    ],
  },
  {
    title: 'Developers',
    links: [
      { text: 'Documentation', href: `${KIT}/docs` },
      { text: 'Pricing', href: `${KIT}/pricing` },
      { text: 'Security', href: `${KIT}/#security` },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'Community', href: DISCORD },
      { text: 'Contact', href: 'mailto:info@decane.app' },
      { text: 'Terms & Privacy', href: '/privacy' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-line bg-card/50 px-4 pb-10 pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="" width={30} height={30} className="h-7 w-7" />
            <span className="font-viga text-2xl text-ink">Decane</span>
          </Link>
          <p className="mt-4 max-w-xs font-plusJakartaSans text-[14px] leading-relaxed text-muted">
            A wallet for people, and wallets, gas and RPC for the apps they use.
          </p>
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <p className="font-plusJakartaSans text-[13px] font-semibold text-ink">{c.title}</p>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.text}>
                  <Link href={l.href} className="font-plusJakartaSans text-[14px] text-muted transition-colors hover:text-gold-ink">
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col justify-between gap-3 border-t border-line pt-6 font-plusJakartaSans text-[13px] text-faint sm:flex-row">
        <span>© Decane {new Date().getFullYear()}</span>
        <span>Made for people, not just crypto natives.</span>
      </div>
    </footer>
  );
};

export default Footer;
