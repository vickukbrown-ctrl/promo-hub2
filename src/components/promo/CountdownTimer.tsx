'use client';

import { useEffect, useState } from 'react';

type Props = {
  expiresAt: string; // ISO
};

export default function CountdownTimer({ expiresAt }: Props) {
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    const target = new Date(expiresAt).getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setLabel('Expired');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      if (days > 0) {
        setLabel(`Expires in ${days} day${days > 1 ? 's' : ''}`);
      } else {
        setLabel(`Expires in ${hours} hour${hours !== 1 ? 's' : ''}`);
      }
    }

    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (!label) return null;

  return <span>{label}</span>;
}
