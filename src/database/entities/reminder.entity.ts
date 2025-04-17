import type { IBaseAttributes } from './base.entity';
import type { ReminderTypeEnum } from '@enums';

/**
 * Attributes for a Reminder entity.
 * Extends the base attributes with specific properties for reminders.
 */
export interface IReminderAttributes extends IBaseAttributes {
  title: string; // Title of the reminder
  reminderType: ReminderTypeEnum; // Type of the reminder (enum)
  sendDate: Date; // Date and time when the reminder should be sent
}
