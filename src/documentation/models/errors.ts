/**
 * Model for a "Not Found" error response.
 */
export const notFoundErrorModel = {
  name: 'NotFoundError',
  description: 'Page was not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          currentRoute: { type: 'string' }, // The current route that caused the error
          error: { type: 'string' }, // Error message
          existingRoutes: {
            type: 'array',
            items: { type: 'string' }, // List of existing routes
          },
          statusCode: { type: 'integer' }, // HTTP status code
        },
      },
    },
  },
};

/**
 * Model for a generic server error response.
 */
export const baseServerErrorModel = {
  name: 'BaseServerError',
  description: 'Base server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: { type: 'string' }, // Error message
          statusCode: { type: 'string' }, // HTTP status code
          payload: { type: 'object' }, // Additional error details
        },
      },
    },
  },
};

/**
 * Model for a validation error response.
 */
export const validationErrorModel = {
  name: 'ValidationError',
  description: 'Validation error occurred',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: { type: 'string' }, // Error message
          statusCode: { type: 'string' }, // HTTP status code
          payload: {
            type: 'object',
            properties: {
              value: {
                type: 'object',
                properties: {
                  sendDate: { type: 'string', format: 'date' }, // Invalid send date
                  title: { type: 'string' }, // Invalid title
                },
              },
              path: { type: 'string' }, // Path of the invalid field
              type: { type: 'string' }, // Type of validation error
              errors: {
                type: 'array',
                items: { type: 'string' }, // List of validation error messages
              },
              params: {
                type: 'object',
                properties: {
                  value: { type: 'string' }, // Invalid value
                  originalValue: { type: 'string' }, // Original value
                  path: { type: 'string' }, // Path of the invalid field
                },
              },
              inner: {
                type: 'array',
                items: { type: 'string' }, // Nested validation errors
              },
              name: { type: 'string' }, // Name of the error
              message: { type: 'string' }, // Detailed error message
            },
          },
        },
      },
    },
  },
};