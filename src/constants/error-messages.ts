/**
 * Constants for error messages used throughout the application.
 */
export const errorMessages = {
  internalError: 'Internal server error',
  notExists: (name: string): string => `${name} does not exist`,
} as const;
