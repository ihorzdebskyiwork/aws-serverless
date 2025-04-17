import {
  createReminderDocumentation,
  getReminderDocumentation,
  deleteReminderDocumentation,
  updateReminderDocumentation,
  getRemindersListDocumentation,
} from '@docs';
import { handlerPath } from '@utils';

/**
 * Helper function to generate HTTP event configurations.
 * @param method - The HTTP method (e.g., 'get', 'post').
 * @param path - The API path (e.g., 'reminders', 'reminders/{reminderId}').
 * @param documentation - The documentation object for the endpoint.
 * @returns The HTTP event configuration.
 */
const createHttpEvent = (method: string, path: string, documentation: object) => ({
  http: {
    method,
    path,
    documentation,
  },
});

export const createReminder = {
  handler: `${handlerPath(__dirname)}/handler.createReminder`,
  events: [createHttpEvent('post', 'reminders', createReminderDocumentation)],
};

export const updateReminder = {
  handler: `${handlerPath(__dirname)}/handler.updateReminder`,
  events: [createHttpEvent('put', 'reminders/{reminderId}', updateReminderDocumentation)],
};

export const deleteReminder = {
  handler: `${handlerPath(__dirname)}/handler.deleteReminder`,
  events: [createHttpEvent('delete', 'reminders/{reminderId}', deleteReminderDocumentation)],
};

export const getRemindersList = {
  handler: `${handlerPath(__dirname)}/handler.getRemindersList`,
  events: [createHttpEvent('get', 'reminders', getRemindersListDocumentation)],
};

export const getReminderById = {
  handler: `${handlerPath(__dirname)}/handler.getReminderById`,
  events: [createHttpEvent('get', 'reminders/{reminderId}', getReminderDocumentation)],
};