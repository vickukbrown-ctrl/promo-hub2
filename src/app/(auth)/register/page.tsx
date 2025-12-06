import { prisma } from '@/lib/prisma';
import { setCreatorCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function registerCreator(formData: FormData) {
  'use server';

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  let username = String(formData.get('username') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!name || !email || !username || !password) {
    return { error: 'All fields are required.' };
  }

  username = username.replace(/[^a-z0-9_]/g, '');

  const existing = await prisma.creator.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (existing) {
    return { error: 'Email or username already in use.' };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const creator = await prisma.creator.create({
    data: { name, email, username, passwordHash },
  });

  await setCreatorCookie(creator.id);

  redirect('/dashboard');
}

export default function RegisterPage() {
  return (
    <main className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Create your creator account</h1>

      <form action={registerCreator} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            name="username"
            placeholder="yourchannel"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Your public page will be <code>yourapp.com/@username</code>
          </p>
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
          Register
        </button>
      </form>
    </main>
  );
}
