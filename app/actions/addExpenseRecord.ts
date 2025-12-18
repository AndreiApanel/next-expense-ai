'use server';
import {auth} from '@clerk/nextjs/server';
import {db} from '@/lib/db';
import {checkUser} from '@/lib/checkUser';
import {revalidatePath} from 'next/cache';

interface RecordData {
  text: string;
  amount: number;
  category: string;
  date: string; // Added date field
}

interface RecordResult {
  data?: RecordData;
  error?: string;
}

async function addExpenseRecord(formData: FormData): Promise<RecordResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');
  const categoryValue = formData.get('category');
  const dateValue = formData.get('date'); // Extract date from formData

  // Check for input values
  if (
    !textValue ||
    textValue === '' ||
    !amountValue ||
    !categoryValue ||
    categoryValue === '' ||
    !dateValue ||
    dateValue === ''
  ) {
    return {error: 'Text, amount, category, or date is missing'};
  }

  const text: string = textValue.toString(); // Ensure text is a string
  const amount: number = parseFloat(amountValue.toString()); // Parse amount as number
  
  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    return {error: 'Invalid amount. Please enter a valid positive number.'};
  }
  
  const category: string = categoryValue.toString(); // Ensure category is a string
  
  // Convert date to Date object for database
  let date: Date;
  try {
    // Parse the date string (YYYY-MM-DD format) and create a date at noon UTC to avoid timezone issues
    const inputDate = dateValue.toString();
    const [year, month, day] = inputDate.split('-');
    
    // Validate date components
    if (!year || !month || !day) {
      return {error: 'Invalid date format. Please use YYYY-MM-DD format.'};
    }
    
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);
    
    if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
      return {error: 'Invalid date format. Please use YYYY-MM-DD format.'};
    }
    
    date = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 12, 0, 0));
    
    // Validate the date is valid
    if (isNaN(date.getTime())) {
      return {error: 'Invalid date. Please enter a valid date.'};
    }
  } catch (error) {
    console.error('Invalid date format:', error); // Log the error
    return {error: 'Invalid date format. Please use YYYY-MM-DD format.'};
  }

  // Get logged in user from Clerk
  const {userId: clerkUserId} = await auth();

  // Check for user
  if (!clerkUserId) {
    return {error: 'User not found'};
  }

  try {
    // Get or create the user in database
    const user = await checkUser();

    if (!user) {
      return {error: 'User not found in database'};
    }

    // NOTE: The database foreign key constraint references User.clerkUserId instead of User.id
    // This is a migration issue. For now, we use clerkUserId to match the constraint.
    // TODO: Create a migration to fix the foreign key to reference User.id instead

    // Verify the user exists in the database before creating record
    const userExists = await db.user.findUnique({
      where: {clerkUserId: user.clerkUserId},
    });

    if (!userExists) {
      console.error('User does not exist in database:', user.clerkUserId);
      return {error: 'User not found in database. Please try logging in again.'};
    }

    // Create a new record (allow multiple expenses per day)
    // Using clerkUserId temporarily to match the database foreign key constraint
    const createdRecord = await db.record.create({
      data: {
        text,
        amount,
        category,
        date, // Save the date to the database
        userId: user.clerkUserId, // Temporary: should be user.id after migration fix
      },
    });

    const recordData: RecordData = {
      text: createdRecord.text,
      amount: createdRecord.amount,
      category: createdRecord.category,
      date: createdRecord.date?.toISOString() || date.toISOString(),
    };

    revalidatePath('/');

    return {data: recordData};
  } catch (error) {
    console.error('Error adding expense record:', error); // Log the error
    
    // Provide more specific error messages
    if (error instanceof Error) {
      // Check for common database errors
      if (error.message.includes('Unique constraint')) {
        return {error: 'This expense record already exists.'};
      }
      if (error.message.includes('Foreign key constraint')) {
        return {error: 'User not found. Please try logging in again.'};
      }
      if (error.message.includes('Invalid value')) {
        return {error: 'Invalid data provided. Please check your inputs.'};
      }
      
      // Log the full error for debugging
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      
      return {
        error: `Error: ${error.message}`,
      };
    }
    
    return {
      error: 'An unexpected error occurred while adding the expense record.',
    };
  }
}

export default addExpenseRecord;
