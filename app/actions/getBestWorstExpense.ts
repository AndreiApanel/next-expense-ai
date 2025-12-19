'use server';
import {db} from '@/lib/db';
import {checkUser} from '@/lib/checkUser';

async function getBestWorstExpense(): Promise<{
  bestExpense?: number;
  worstExpense?: number;
  error?: string;
}> {
  const user = await checkUser();

  if (!user) {
    return {error: 'User not found'};
  }

  try {
    // Fetch all records for the authenticated user
    const records: {amount: number}[] = await db.record.findMany({
      where: {userId: user.clerkUserId},
      select: {amount: true},
    });

    if (!records.length) {
      return {bestExpense: 0, worstExpense: 0}; // no records
    }

    // Map amounts (TypeScript already knows record has `amount`)
    const amounts = records.map(record => record.amount);

    // Calculate best and worst expense amounts
    const bestExpense = Math.max(...amounts);
    const worstExpense = Math.min(...amounts);

    return {bestExpense, worstExpense};
  } catch (error) {
    console.error('Error fetching expense amounts:', error);
    return {error: 'Database error'};
  }
}

export default getBestWorstExpense;
