import { defaultErrorResponses, defaultPaginationParams } from '../constants';
import { reminderIdParam } from './params';

/**
 * Documentation for creating a reminder.
 */
export const createReminderDocumentation = {
  summary: 'Create Reminder',
  description: 'Creates a new reminder to send.',
  requestBody: {
    description: 'Parameters for creating a reminder.',
  },
  requestModels: {
    'application/json': 'CreateReminderRequest',
  },
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'The created reminder object.',
      },
      responseModels: {
        'application/json': 'ReminderResponse',
      },
    },
    {
      statusCode: 400,
      responseBody: {
        description: 'Validation error.',
      },
      responseModels: {
        'application/json': 'ValidationError',
      },
    },
    ...defaultErrorResponses,
  ],
};

/**
 * Documentation for updating a reminder.
 */
export const updateReminderDocumentation = {
  summary: 'Update Reminder',
  description: 'Updates an existing reminder.',
  pathParams: [reminderIdParam],
  requestBody: {
    description: 'Parameters for updating a reminder.',
  },
  requestModels: {
    'application/json': 'UpdateReminderRequest',
  },
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'The updated reminder object.',
      },
      responseModels: {
        'application/json': 'ReminderResponse',
      },
    },
    {
      statusCode: 400,
      responseBody: {
        description: 'Validation error.',
      },
      responseModels: {
        'application/json': 'ValidationError',
      },
    },
    {
      statusCode: 404,
      responseBody: {
        description: 'Entity not found.',
      },
      responseModels: {
        'application/json': 'BaseServerError',
      },
    },
    ...defaultErrorResponses,
  ],
};

/**
 * Documentation for deleting a reminder.
 */
export const deleteReminderDocumentation = {
  summary: 'Delete Reminder',
  description: 'Deletes an existing reminder.',
  pathParams: [reminderIdParam],
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'Success message.',
      },
      responseModels: {
        'application/json': 'BaseSuccess',
      },
    },
    {
      statusCode: 404,
      responseBody: {
        description: 'Entity not found.',
      },
      responseModels: {
        'application/json': 'BaseServerError',
      },
    },
    ...defaultErrorResponses,
  ],
};

/**
 * Documentation for retrieving a list of reminders.
 */
export const getRemindersListDocumentation = {
  summary: 'Get Reminders List',
  description: 'Retrieves a paginated list of reminders.',
  queryParams: defaultPaginationParams,
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'A list of paginated reminders.',
      },
      responseModels: {
        'application/json': 'RemindersListResponse',
      },
    },
    ...defaultErrorResponses,
  ],
};

/**
 * Documentation for retrieving a reminder by ID.
 */
export const getReminderDocumentation = {
  summary: 'Get Reminder by ID',
  description: 'Retrieves a reminder by its unique identifier.',
  pathParams: [reminderIdParam],
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'The reminder object.',
      },
      responseModels: {
        'application/json': 'ReminderResponse',
      },
    },
    {
      statusCode: 404,
      responseBody: {
        description: 'Entity not found.',
      },
      responseModels: {
        'application/json': 'BaseServerError',
      },
    },
    ...defaultErrorResponses,
  ],
};