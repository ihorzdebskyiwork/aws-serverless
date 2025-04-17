import { remindersService } from '@services';
import debug from 'debug';

const logger = debug('app:error');

/**
 * Scheduled handler for sending reminders.
 * Invokes the reminders service to process and send reminder events.
 */
export const sendReminders = async (): Promise<void> => {
  try {
    await remindersService.sendEvents();
    logger('Reminders sent successfully');
  } catch (error) {
    logger('Error occurred while sending reminders:', error);
    throw error; // Re-throw the error to ensure proper error handling upstream
  }
};