import { limitParam, cursorParam } from './params';

/**
 * Default error responses used across API documentation.
 */
export const defaultErrorResponses = [
  {
    statusCode: 404,
    responseBody: {
      description: 'Page not found', // Resource not found error
    },
    responseModels: {
      'application/json': 'NotFoundError',
    },
  },
  {
    statusCode: 400,
    responseBody: {
      description: 'Bad request', // Validation or client-side error
    },
    responseModels: {
      'application/json': 'BaseServerError',
    },
  },
  {
    statusCode: 500,
    responseBody: {
      description: 'Internal server error', // Server-side error
    },
    responseModels: {
      'application/json': 'BaseServerError',
    },
  },
];

/**
 * Default pagination parameters used across API documentation.
 */
export const defaultPaginationParams = [limitParam, cursorParam];