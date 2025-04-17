/**
 * Base properties for a reminder response.
 */
const baseReminderProperties = {
  id: {
    type: 'string', // Unique identifier for the reminder
  },
  title: {
    type: 'string', // Title of the reminder
  },
  sendDate: {
    type: 'string', // Date when the reminder should be sent
    format: 'date',
  },
  createdAt: {
    type: 'string', // Timestamp when the reminder was created
    format: 'date',
  },
  updatedAt: {
    type: 'string', // Timestamp when the reminder was last updated
    format: 'date',
  },
};

/**
 * Model for a single reminder response.
 */
export const reminderResponseModel = {
  name: 'ReminderResponse',
  description: 'Response model for a single reminder',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: baseReminderProperties,
      },
    },
  },
};

/**
 * Model for a list of reminders response.
 */
export const remindersListResponseModel = {
  name: 'RemindersListResponse',
  description: 'Response model for a list of reminders',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array', // Array of reminders
            items: {
              type: 'object',
              properties: baseReminderProperties, // Reuse base reminder properties
            },
          },
          cursor: {
            type: 'string', // Cursor for pagination
          },
        },
      },
    },
  },
};
