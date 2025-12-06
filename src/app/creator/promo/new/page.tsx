import { getCurrentCreator } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CATEGORY_OPTIONS } from '@/lib/categories';
import { redirect } from 'next/navigation';

async function createPromo(formData: FormData) {
  'use server';

  const creator = await getCurrentCreator();
  if (!creator) redirect('/login');

  const brandName = String(formData.get('brandName') || '').trim();
  const promoCode = String(formData.get('promoCode') || '').trim();
  const destinationUrl = String(formData.get('destinationUrl') || '').trim();
  const discountSummary = String(formData.get('discountSummary') || '').trim();
  const category = String(formData.get('category') || '');
  const expiresAtRaw = String(formData.get('expiresAt') || '').trim();

  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : null;

  await prisma.promoCode.create({
    data: {
      creatorId: creator.id,
      brandName,
      promoCode,
      destinationUrl,
      discountSummary: discountSummary || null,
      category: category as any,
      expiresAt,
    },
  });

  redirect('/dashboard');
}

export default async function NewPromoPage() {
  const creator = await getCurrentCreator();
  if (!creator) redirect('/login');

  return (
    <main className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Add promo code</h1>

      <form action={createPromo} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Brand</label>
          <input
            name="brandName"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Promo code</label>
          <input
            name="promoCode"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Destination URL</label>
          <input
            name="destinationUrl"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Discount summary</label>
          <input
            name="discountSummary"
            placeholder="e.g. 82% off + 3 months free"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            name="category"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Expires at</label>
          <input
            name="expiresAt"
            type="date"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Optional. Leave blank for no expiry.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-white text-black py-2.5 text-sm font-medium"
        >
          Save
        </button>
      </form>
    </main>
  );
}
