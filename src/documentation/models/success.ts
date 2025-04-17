/**
 * Model for a generic success response.
 */
export const baseSuccessModel = {
  name: 'BaseSuccess',
  description: 'Base success response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string', // Success message
          },
        },
      },
    },
  },
};
