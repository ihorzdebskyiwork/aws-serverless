import { object, number, string } from 'yup';

/**
 * Schema for validating pagination parameters.
 */
export const paginationSchema = object()
  .shape({
    cursor: string()
      .optional()
      .typeError('Cursor must be a string'), // Ensure cursor is a valid string
    limit: number()
      .optional()
      .integer('Limit must be an integer') // Ensure limit is an integer
      .positive('Limit must be a positive number') // Ensure limit is positive
      .typeError('Limit must be a number'),
  })
  .noUnknown(true, 'Unknown keys are not allowed'); // Disallow unknown keys
