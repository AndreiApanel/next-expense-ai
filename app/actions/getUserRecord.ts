// app/actions/getUserRecord.ts
'use server';
import {db} from '@/lib/db';
import {checkUser} from '@/lib/checkUser';
import {Record} from '@/types/Record';

export default async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
  error?: string;
}> {
  const user = await checkUser();
  if (!user) return {error: 'User not found'};

  try {
    const records: Record[] = await db.record.findMany({
      where: {userId: user.clerkUserId},
    });

    const record = records.reduce((sum, r) => sum + r.amount, 0);
    const daysWithRecords = records.filter(r => r.amount > 0).length;

    return {record, daysWithRecords};
  } catch (err) {
    console.error(err);
    return {error: 'Database error'};
  }
}
