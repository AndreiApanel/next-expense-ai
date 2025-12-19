'use server';
import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs/server';
import {Record} from '@/types/Record'; // если есть свой интерфейс Record

async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
  error?: string;
}> {
  const {userId} = await auth();

  if (!userId) {
    return {error: 'User not found'};
  }

  try {
    // Получаем все записи пользователя
    const records: Record[] = await db.record.findMany({
      where: {userId},
    });

    // Суммируем все значения
    const record: number = records.reduce((sum: number, r: Record) => sum + r.amount, 0);

    // Считаем количество дней с записью
    const daysWithRecords: number = records.filter(r => r.amount > 0).length;

    return {record, daysWithRecords};
  } catch (error) {
    console.error('Error fetching user record:', error);
    return {error: 'Database error'};
  }
}

export default getUserRecord;
