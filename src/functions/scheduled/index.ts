import { handlerPath } from '@utils';

/**
 * Configuration for the scheduled function to send reminders.
 * This function is triggered at a regular interval defined by the schedule.
 */
export default {
  handler: `${handlerPath(__dirname)}/handler.sendReminders`,
  events: [
    {
      schedule: {
        rate: ['rate(1 minute)'], // Trigger the function every 1 minute
        enabled: true, // Ensure the schedule is enabled
      },
    },
  ],
};
