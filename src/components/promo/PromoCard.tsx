import CountdownTimer from './CountdownTimer';
import CopyCodeButton from './CopyCodeButton';

type Props = {
  brandName: string;
  promoCode: string;
  destinationUrl: string;
  discountSummary?: string;
  expiresAt?: string;
};

export default function PromoCard({
  brandName,
  promoCode,
  destinationUrl,
  discountSummary,
  expiresAt,
}: Props) {
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
  if (isExpired) return null;

  return (
    <div className="border border-neutral-800 rounded-xl p-4 flex flex-col gap-3 bg-neutral-900/40">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">{brandName}</h3>
          {discountSummary && (
            <p className="text-xs text-neutral-400">{discountSummary}</p>
          )}
        </div>
        <CopyCodeButton code={promoCode} />
      </div>

      <a
        href={destinationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs underline"
      >
        Go to offer →
      </a>

      {expiresAt && (
        <div className="text-[11px] text-neutral-500">
          <CountdownTimer expiresAt={expiresAt} />
        </div>
      )}
    </div>
  );
}
