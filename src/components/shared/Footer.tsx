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
      { text: 'Node docs', href: `${KIT}/node-docs` },
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
    <footer className="px-5 pb-10 pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[repeat(3,minmax(0,180px))_1fr]">
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <p className="text-[13.5px] text-ink">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.text}>
                  <Link href={l.href} className="text-[13.5px] text-muted transition-colors hover:text-ink">
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col md:items-end md:text-right">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="" width={34} height={34} className="h-8 w-8" />
            <span className="font-viga text-[34px] leading-none text-ink">Decane</span>
          </Link>
          <p className="mt-5 max-w-[16rem] text-[16px] leading-snug text-ink">No one holds a whole key. Not even us.</p>
          <p className="mt-auto pt-10 text-[12.5px] text-faint">© Decane {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
