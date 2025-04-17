import { date, object, string } from 'yup';

/**
 * Schema for validating a reminder ID.
 */
export const reminderIdSchema = object()
  .shape({
    reminderId: string()
      .uuid('Reminder ID must be a valid UUID') // Ensure reminderId is a valid UUID
      .required('Reminder ID is required'),
  })
  .noUnknown(true, 'Unknown keys are not allowed'); // Disallow unknown keys

/**
 * Schema for validating the payload to create a reminder.
 */
export const createReminderSchema = object()
  .shape({
    title: string()
      .required('Title is required') // Ensure title is provided
      .max(1000, 'Title must not exceed 1000 characters'), // Limit title length
    sendDate: date()
      .required('Send date is required') // Ensure sendDate is provided
      .test(
        'sendDate',
        'Send date must be in the future',
        function () {
          return new Date(this.parent.sendDate).getTime() > Date.now(); // Ensure sendDate is in the future
        },
      ),
  })
  .noUnknown(true, 'Unknown keys are not allowed'); // Disallow unknown keys

/**
 * Schema for validating the payload to update a reminder.
 */
export const updateReminderSchema = object()
  .shape({
    title: string().max(1000, 'Title must not exceed 1000 characters'), // Optional title with length validation
    sendDate: date()
      .test(
        'sendDate',
        'Send date must be in the future',
        function () {
          return new Date(this.parent.sendDate).getTime() > Date.now(); // Ensure sendDate is in the future
        },
      ),
  })
  .noUnknown(true, 'Unknown keys are not allowed'); // Disallow unknown keys