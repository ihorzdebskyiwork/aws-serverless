import { errorMessages } from '@constants';
import { ClientError } from '@errors';
import debug from 'debug';
import { ValidationError } from 'yup';

import type { IErrorResponseBody } from '@responses';

const logger = debug('app:error');

/**
 * Middleware for handling errors in AWS Lambda functions.
 * It formats the error response and logs internal server errors.
 */
const errorHandler = {
  onError: (handler) => {
    const { error } = handler;

    // Default response for internal server errors
    let responseBody: IErrorResponseBody = {
      error: errorMessages.internalError,
      statusCode: 500,
      payload: {},
    };

    // Handle client-side errors
    if (error instanceof ClientError) {
      responseBody = {
        error: error.message,
        statusCode: error.statusCode,
        payload: error.payload,
      };
    }

    // Handle validation errors
    if (error instanceof ValidationError) {
      responseBody = {
        error: error.message,
        statusCode: 400,
        payload: error,
      };
    }

    // Log internal server errors
    if (responseBody.statusCode === 500) {
      logger('Internal Server Error:', error);
    }

    return {
      statusCode: responseBody.statusCode,
      body: JSON.stringify(responseBody),
    };
  },
};

export default errorHandler;
