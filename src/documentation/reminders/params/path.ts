/**
 * Path parameter for specifying the ID of a reminder.
 */
export const reminderIdParam = {
  name: 'reminderId',
  description: 'The unique identifier of the reminder',
  schema: {
    type: 'string', // Reminder ID is represented as a string
  },
};
