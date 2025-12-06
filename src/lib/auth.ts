import { cookies } from 'next/headers';
import { prisma } from './prisma';

const COOKIE_NAME = 'creatorId';

export async function getCurrentCreator() {
  const cookieStore = await cookies();
  const creatorId = cookieStore.get(COOKIE_NAME)?.value;

  if (!creatorId) return null;

  const creator = await prisma.creator.findUnique({
    where: { id: creatorId },
  });

  return creator;
}

export async function setCreatorCookie(creatorId: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, creatorId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearCreatorCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
