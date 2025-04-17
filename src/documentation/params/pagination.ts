/**
 * Parameter for specifying the cursor of the last item in paginated results.
 */
export const cursorParam = {
  name: 'cursor',
  description: 'Cursor of the last item',
  schema: {
    type: 'string', // Cursor is represented as a string
  },
};

/**
 * Parameter for specifying the maximum number of items per page in paginated results.
 */
export const limitParam = {
  name: 'limit',
  description: 'Limit of items per page',
  schema: {
    type: 'integer', // Limit is represented as an integer
  },
};
