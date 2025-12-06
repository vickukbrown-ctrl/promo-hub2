import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type Props = {
  code: string;
};

export const CopyCodeButton: React.FC<Props> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200
        ${copied 
          ? 'border-green-500 text-green-400 bg-green-500/10' 
          : 'border-neutral-600 text-neutral-300 bg-neutral-900 hover:border-neutral-500 hover:text-white'
        }
      `}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : code}
    </button>
  );
};