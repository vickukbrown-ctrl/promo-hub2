'use client';

import { useState } from 'react';

type Props = {
  code: string;
};

export default function CopyCodeButton({ code }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="px-3 py-1.5 rounded-full border border-neutral-600 text-xs font-mono bg-neutral-900"
    >
      {copied ? 'Copied!' : code}
    </button>
  );
}
