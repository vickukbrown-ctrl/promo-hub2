import { prisma } from '@/lib/prisma';
import PromoCard from '@/components/promo/PromoCard';
import CategoryTabs from '@/components/promo/CategoryTabs';

type Props = {
  params: { username: string };
};

export default async function PublicCreatorPage({ params }: Props) {
  const username = params.username.toLowerCase();

  const creator = await prisma.creator.findUnique({
    where: { username },
  });

  if (!creator) {
    return (
      <main className="py-16">
        <h1 className="text-2xl font-semibold">Creator not found</h1>
        <p className="text-sm text-neutral-400 mt-2">
          This promo page doesn&apos;t exist.
        </p>
      </main>
    );
  }

  const promoCodes = await prisma.promoCode.findMany({
    where: { creatorId: creator.id, isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  const categoriesSet = new Set<string>();
  promoCodes.forEach((p) => categoriesSet.add(p.category));
  const categories = ['All', ...Array.from(categoriesSet)];

  return (
    <main className="py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">
          {creator.name}&apos;s promo codes
        </h1>
        <p className="text-sm text-neutral-400">
          Save this page so you always have their latest deals.
        </p>
      </header>

      <CategoryTabsWrapper categories={categories} promoCodes={promoCodes} />
      <footer className="pt-6 text-xs text-neutral-500">
        Powered by{' '}
        <a href="/" className="underline">
          PromoHub
        </a>
        . Create your own promo page in minutes.
      </footer>
    </main>
  );
}

import { PromoCode } from '@prisma/client';
import PromoCard from '@/components/promo/PromoCard';
import CategoryTabs from '@/components/promo/CategoryTabs';

function CategoryTabsWrapper({
  categories,
  promoCodes,
}: {
  categories: string[];
  promoCodes: PromoCode[];
}) {
  // This part needs to be client-side for interactivity:
  return (
    <CategoryTabsClient categories={categories} promoCodes={promoCodes} />
  );
}

// Client component:

// src/components/promo/CategoryTabsClient.tsx (or inline in same file)
'use client';

import { useState } from 'react';

function CategoryTabsClient({
  categories,
  promoCodes,
}: {
  categories: string[];
  promoCodes: PromoCode[];
}) {
  const [active, setActive] = useState<string>('All');

  const filtered =
    active === 'All'
      ? promoCodes
      : promoCodes.filter((p) => p.category === active);

  return (
    <div className="space-y-4">
      <CategoryTabs
        categories={categories}
        active={active}
        onChange={setActive}
      />
      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-400">
          No active promo codes in this category.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((promo) => (
            <PromoCard
              key={promo.id}
              brandName={promo.brandName}
              promoCode={promo.promoCode}
              destinationUrl={promo.destinationUrl}
              discountSummary={promo.discountSummary || undefined}
              expiresAt={promo.expiresAt?.toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
