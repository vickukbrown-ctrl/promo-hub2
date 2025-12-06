import { prisma } from '@/lib/prisma';
import { setCreatorCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function loginCreator(formData: FormData) {
  'use server';

  const emailOrUsername = String(formData.get('identity') || '').trim();
  const password = String(formData.get('password') || '');

  if (!emailOrUsername || !password) {
    return { error: 'Both fields are required.' };
  }

  const creator = await prisma.creator.findFirst({
    where: {
      OR: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() },
      ],
    },
  });

  if (!creator) {
    return { error: 'Invalid credentials.' };
  }

  const ok = await bcrypt.compare(password, creator.passwordHash);
  if (!ok) {
    return { error: 'Invalid credentials.' };
  }

  await setCreatorCookie(creator.id);

  redirect('/dashboard');
}

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Log in</h1>

      <form action={loginCreator} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email or username</label>
          <input
            name="identity"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            name="password"
            type="password"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-white text-black py-2.5 text-sm font-medium"
        >
          Log in
        </button>
      </form>
    </main>
  );
}
