'use server';
import {db} from '@/lib/db';
import {checkUser} from '@/lib/checkUser';
import {Record} from '@/types/Record';

async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
  error?: string;
}> {
  const user = await checkUser();

  if (!user) {
    return {error: 'User not found'};
  }

  try {
    // NOTE: Using clerkUserId to match database foreign key constraint
    // TODO: Fix database migration to reference User.id instead of User.clerkUserId
    const records: Record[] = await db.record.findMany({
      where: {userId: user.clerkUserId},
    });

    const record = records.reduce((sum: number, record) => sum + record.amount, 0);

    // Count the number of days with valid sleep records
    const daysWithRecords = records.filter(record => record.amount > 0).length;

    return {record, daysWithRecords};
  } catch (error) {
    console.error('Error fetching user record:', error); // Log the error
    return {error: 'Database error'};
  }
}

export default getUserRecord;
