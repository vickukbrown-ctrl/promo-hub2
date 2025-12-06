import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

type Props = {
  expiresAt: string; // ISO
};

export const CountdownTimer: React.FC<Props> = ({ expiresAt }) => {
  const [label, setLabel] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const target = new Date(expiresAt).getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setLabel('Expired');
        setIsExpired(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      if (days > 0) {
        setLabel(`${days} day${days > 1 ? 's' : ''} left`);
      } else {
        setLabel(`${hours} hour${hours !== 1 ? 's' : ''} left`);
      }
    }

    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (!label) return null;

  return (
    <div className={`flex items-center gap-1.5 ${isExpired ? 'text-red-400' : 'text-neutral-500'}`}>
      <Clock size={12} />
      <span>{label}</span>
    </div>
  );
};