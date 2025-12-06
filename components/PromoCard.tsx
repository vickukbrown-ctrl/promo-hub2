import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CopyCodeButton } from './CopyCodeButton';
import { CountdownTimer } from './CountdownTimer';

type Props = {
  brandName: string;
  promoCode: string;
  destinationUrl: string;
  discountSummary?: string;
  expiresAt?: string | null;
  showEditLink?: boolean;
  onEdit?: () => void;
};

export const PromoCard: React.FC<Props> = ({
  brandName,
  promoCode,
  destinationUrl,
  discountSummary,
  expiresAt,
  showEditLink,
  onEdit,
}) => {
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;

  return (
    <div className={`
      group border border-neutral-800 rounded-xl p-5 flex flex-col gap-4 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors
      ${isExpired ? 'opacity-60' : 'opacity-100'}
    `}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-neutral-100">{brandName}</h3>
          {discountSummary && (
            <p className="text-sm text-neutral-400 mt-1">{discountSummary}</p>
          )}
        </div>
        <CopyCodeButton code={promoCode} />
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-800/50">
        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          Go to offer <ExternalLink size={10} />
        </a>

        <div className="flex items-center gap-4">
            {expiresAt && (
            <div className="text-[11px]">
                <CountdownTimer expiresAt={expiresAt} />
            </div>
            )}
            
            {showEditLink && onEdit && (
                <button 
                    onClick={onEdit}
                    className="text-xs text-neutral-500 hover:text-white underline"
                >
                    Edit
                </button>
            )}
        </div>
      </div>
    </div>
  );
};