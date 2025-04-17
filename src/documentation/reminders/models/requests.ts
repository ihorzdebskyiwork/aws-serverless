/**
 * Base properties for a reminder request.
 */
const baseReminderProperties = {
  title: {
    type: 'string', // Title of the reminder
  },
  sendDate: {
    type: 'string', // Date when the reminder should be sent
    format: 'date',
  },
};

/**
 * Model for a JSON request to create a reminder.
 */
export const createReminderRequestModel = {
  name: 'CreateReminderRequest',
  description: 'JSON request for creating a reminder',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: baseReminderProperties,
        required: ['title', 'sendDate'], // Required fields for creating a reminder
      },
    },
  },
};

/**
 * Model for a JSON request to update a reminder.
 */
export const updateReminderRequestModel = {
  name: 'UpdateReminderRequest',
  description: 'JSON request for updating a reminder',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: baseReminderProperties, // Fields that can be updated
      },
    },
  },
};