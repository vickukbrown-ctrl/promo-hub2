import { getCurrentCreator, clearCreatorCookie } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function logout() {
  'use server';
  await clearCreatorCookie();
  redirect('/');
}

export default async function DashboardPage() {
  const creator = await getCurrentCreator();
  if (!creator) redirect('/login');

  const promoCodes = await prisma.promoCode.findMany({
    where: { creatorId: creator.id },
    orderBy: { createdAt: 'desc' },
  });

  const publicUrl = `http://localhost:3000/@${creator.username}`;

  return (
    <main className="py-10 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your promo codes</h1>
          <p className="text-sm text-neutral-400">
            Public page:{' '}
            <a
              href={publicUrl}
              target="_blank"
              className="underline break-all"
            >
              {publicUrl}
            </a>
          </p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="text-sm border border-neutral-600 rounded-md px-3 py-1.5"
          >
            Log out
          </button>
        </form>
      </header>

      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-neutral-300">Promo codes</h2>
        <Link
          href="/creator/promo/new"
          className="text-sm rounded-md bg-white text-black px-3 py-1.5"
        >
          Add promo code
        </Link>
      </div>

      {promoCodes.length === 0 ? (
        <p className="text-sm text-neutral-400">
          You don&apos;t have any promo codes yet. Add your first one to share
          with your viewers.
        </p>
      ) : (
        <div className="space-y-3">
          {promoCodes.map((promo) => (
            <div
              key={promo.id}
              className="flex items-center justify-between border border-neutral-800 rounded-lg px-3 py-2"
            >
              <div className="space-y-1">
                <div className="text-sm font-medium">{promo.brandName}</div>
                <div className="text-xs text-neutral-400">
                  Code: <span className="font-mono">{promo.promoCode}</span>{' '}
                  • Category: {promo.category}
                </div>
              </div>
              <Link
                href={`/creator/promo/${promo.id}/edit`}
                className="text-xs underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
