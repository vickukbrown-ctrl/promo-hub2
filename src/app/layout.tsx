import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PromoHub – One link for all your promo codes',
  description: 'Give your viewers a single page with all your active promo codes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
