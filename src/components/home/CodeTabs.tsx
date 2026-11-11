'use client';

import { useState } from 'react';

// Real snippets, taken from each SDK's README and llms.txt. Keep them in step
// when an API changes.

const SNIPPETS = [
  {
    key: 'React',
    file: 'app.tsx',
    code: `import { DecaneKit, useSocialWallet } from "decane-connect-kit";

export default function App() {
  return (
    <DecaneKit config={{
      mode: "social",
      social: {
        apiKey: "dck_live_…",
        authMethods: ["google", "email", "x"],
      },
    }}>
      <Checkout />
    </DecaneKit>
  );
}

function Checkout() {
  const { isConnected, addresses, openModal } = useSocialWallet();
  if (!isConnected) return <button onClick={openModal}>Sign in</button>;
  return <p>Your wallet: {addresses?.evm}</p>;
}`,
  },
  {
    key: 'React Native',
    file: 'wallet.ts',
    code: `import { createDecaneConnect } from "decane-connect-kit-expo";

const decane = await createDecaneConnect({
  appId: "proj_…",
  apiKey: "pk_…",
  chains: ["evm:8453", "solana:mainnet"],
  authMethods: ["email"],
});

await decane.connectWithEmail("ada@example.com");
const { addresses } = await decane.verifyEmailCode("ada@example.com", "123456");

const txHash = await decane.sendTransaction({
  chain: "evm:8453",
  to: "0x…",
  value: 10_000_000_000_000n,
});`,
  },
  {
    key: 'Node',
    file: 'server.ts',
    code: `import { DecaneClient } from "decane-node";

const decane = new DecaneClient({ appId: process.env.DECANE_APP_ID });

// Fail closed: null instead of throwing
const claims = await decane.safeVerifyAccessToken(token);
if (!claims) return res.status(401).json({ error: "unauthorized" });

// The signed-in user's wallet, from your backend
const user = await decane.getUser(token);`,
  },
  {
    key: 'RPC',
    file: 'client.ts',
    code: `import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

// Coming soon: one URL, from your Decane project
const client = createPublicClient({
  chain: base,
  transport: http("https://backend.decane.app/rpc/v1/8453/dck_rpc_…"),
});

const block = await client.getBlockNumber();`,
  },
];

const KEYWORDS = /\b(import|from|export|default|function|return|const|await|if|new)\b/;

/** A small, dependency-free highlighter: comments, strings and keywords. */
function Highlight({ code }: { code: string }) {
  return (
    <>
      {code.split('\n').map((line, i) => {
        const c = line.indexOf('//');
        const body = c >= 0 ? line.slice(0, c) : line;
        const comment = c >= 0 ? line.slice(c) : '';
        const parts = body.split(/("[^"]*")/g);
        return (
          <span key={i} className="block">
            {parts.map((part, j) =>
              part.startsWith('"') ? (
                <span key={j} className="text-[#f3c969]">
                  {part}
                </span>
              ) : (
                part.split(KEYWORDS).map((w, k) =>
                  KEYWORDS.test(w) ? (
                    <span key={`${j}-${k}`} className="text-[#e39b6b]">
                      {w}
                    </span>
                  ) : (
                    <span key={`${j}-${k}`}>{w}</span>
                  ),
                )
              ),
            )}
            {comment && <span className="text-white/35">{comment}</span>}
            {line === '' && ' '}
          </span>
        );
      })}
    </>
  );
}

export default function CodeTabs() {
  const [active, setActive] = useState(0);
  const s = SNIPPETS[active]!;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#11100c] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-3 py-2.5">
        <div role="tablist" aria-label="SDK" className="flex gap-1 overflow-x-auto">
          {SNIPPETS.map((x, i) => (
            <button
              key={x.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                i === active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {x.key}
            </button>
          ))}
        </div>
        <span className="hidden font-mono text-[12px] text-white/40 sm:block">{s.file}</span>
      </div>
      <pre className="h-[420px] overflow-auto px-5 py-5 font-mono text-[12.5px] leading-[1.7] text-[#ebe7dc] md:text-[13px]" role="tabpanel">
        <code>
          <Highlight code={s.code} />
        </code>
      </pre>
    </div>
  );
}
