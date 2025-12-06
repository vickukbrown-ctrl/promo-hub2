import { getCurrentCreator } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CATEGORY_OPTIONS } from '@/lib/categories';
import { redirect, notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

async function updatePromo(formData: FormData) {
  'use server';

  const creator = await getCurrentCreator();
  if (!creator) redirect('/login');

  const id = String(formData.get('id') || '');
  const brandName = String(formData.get('brandName') || '').trim();
  const promoCode = String(formData.get('promoCode') || '').trim();
  const destinationUrl = String(formData.get('destinationUrl') || '').trim();
  const discountSummary = String(formData.get('discountSummary') || '').trim();
  const category = String(formData.get('category') || '');
  const expiresAtRaw = String(formData.get('expiresAt') || '').trim();

  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : null;

  await prisma.promoCode.update({
    where: { id },
    data: {
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

export default async function EditPromoPage({ params }: Props) {
  const creator = await getCurrentCreator();
  if (!creator) redirect('/login');

  const promo = await prisma.promoCode.findFirst({
    where: { id: params.id, creatorId: creator.id },
  });

  if (!promo) notFound();

  const expiresDate = promo.expiresAt
    ? promo.expiresAt.toISOString().slice(0, 10)
    : '';

  return (
    <main className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Edit promo code</h1>

      <form action={updatePromo} className="space-y-4">
        <input type="hidden" name="id" value={promo.id} />
        <div>
          <label className="block text-sm mb-1">Brand</label>
          <input
            name="brandName"
            defaultValue={promo.brandName}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Promo code</label>
          <input
            name="promoCode"
            defaultValue={promo.promoCode}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Destination URL</label>
          <input
            name="destinationUrl"
            defaultValue={promo.destinationUrl}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Discount summary</label>
          <input
            name="discountSummary"
            defaultValue={promo.discountSummary || ''}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            name="category"
            defaultValue={promo.category}
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
            defaultValue={expiresDate}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-white text-black py-2.5 text-sm font-medium"
        >
          Save changes
        </button>
      </form>
    </main>
  );
}
