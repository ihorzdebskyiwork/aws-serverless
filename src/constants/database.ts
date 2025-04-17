/**
 * Constants for database returning types.
 */
export const DatabaseReturningType = {
  ALL_NEW: 'ALL_NEW',
} as const;

/**
 * Constants for database table names.
 */
export const DatabaseTableNames = {
  REMINDERS: 'reminders',
} as const;

/**
 * Constants for database index names.
 */
export const DatabaseIndexNames = {
  TIME_INDEX: 'TimeIndex',
  SORT_INDEX: 'SortIndex',
} as const;
