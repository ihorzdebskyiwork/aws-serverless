import type { ReminderTypeEnum } from '@enums';

/**
 * Interface representing the payload for creating a reminder.
 */
export interface ICreateReminderRequest {
  title: string; // Title of the reminder
  reminderType: ReminderTypeEnum; // Type of the reminder (e.g., Email, Phone)
  sendDate: Date; // Date and time when the reminder should be sent
}

/**
 * Interface representing the payload for updating a reminder.
 * All fields are optional to allow partial updates.
 */
export interface IUpdateReminderRequest {
  title?: string; // Optional title of the reminder
  reminderType?: ReminderTypeEnum; // Optional type of the reminder
  sendDate?: Date; // Optional date and time for the reminder
}
