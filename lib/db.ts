// lib/db.ts
import {PrismaClient} from '@prisma/client';

declare global {
  // Prevent multiple instances of Prisma Client in development
  // to avoid exhausting your database connections
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
