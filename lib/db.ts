import PrismaClient from '@prisma/client/edge';
import {PrismaPg} from '@prisma/adapter-pg';
import pg from 'pg';

const {Pool} = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);

// Edge Prisma уже экспортирует готовый клиент
export const db = PrismaClient;

// Если нужно, подключаем адаптер (иногда необязательно)
db.$connect({adapter});

// Hot reload / singleton паттерн не нужен для edge Prisma
