import { timeUtil } from '@utils';
import { v4 as uuidv4 } from 'uuid';

import type { IMail } from '@dto';
import type { IReminderAttributes } from '@entities';
import type { ICreateReminderRequest } from '@requests';
import type { IReminderResponse } from '@responses';

/**
 * Converts a reminder entity to a response object.
 * @param reminder - The reminder entity from the database.
 * @returns The reminder response object.
 */
export const createReminderResponse = (reminder: IReminderAttributes): IReminderResponse => ({
  id: reminder.id,
  title: reminder.title,
  sendDate: new Date(reminder.sendDate), // Convert timestamp to Date
  createdAt: new Date(reminder.createdAt), // Convert timestamp to Date
  updatedAt: new Date(reminder.updatedAt), // Convert timestamp to Date
});

/**
 * Converts a list of reminder entities to response objects.
 * @param reminders - The list of reminder entities from the database.
 * @returns The list of reminder response objects.
 */
export const createRemindersResponse = (reminders: IReminderAttributes[]): IReminderResponse[] =>
  reminders.map(createReminderResponse);

/**
 * Converts a create reminder request to a database object.
 * @param reminder - The create reminder request payload.
 * @returns The reminder object formatted for the database.
 */
export const toDbObject = (reminder: ICreateReminderRequest): IReminderAttributes => ({
  id: uuidv4(), // Generate a unique ID
  ...reminder,
  sendDate: new Date(timeUtil.getMinutelyTimeStamp(reminder.sendDate)), // Normalize sendDate
  createdAt: new Date(Date.now()), // Current timestamp
  updatedAt: new Date(Date.now()), // Current timestamp
});

/**
 * Converts a partial update reminder request to a database update object.
 * @param reminder - The partial update reminder request payload.
 * @returns The reminder object formatted for a database update.
 */
export const toDbUpdateObject = (
  reminder: Partial<ICreateReminderRequest>,
): Partial<IReminderAttributes> => ({
  ...reminder,
  ...(reminder.sendDate
    ? { sendDate: new Date(timeUtil.getMinutelyTimeStamp(reminder.sendDate)) }
    : {}),
  updatedAt: new Date(Date.now()), // Update the timestamp
});

/**
 * Converts a reminder entity to an email object.
 * @param recipients - The list of email recipients.
 * @param reminder - The reminder entity.
 * @returns The email object formatted for sending.
 */
export const toEmailObject = (recipients: string[], reminder: IReminderAttributes): IMail => ({
  recipients,
  title: reminder.title,
});