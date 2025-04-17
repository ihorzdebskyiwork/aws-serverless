/**
 * Interface representing the structure of an error response body.
 */
export interface IErrorResponseBody {
  error: string; // Error message describing the issue
  statusCode: number; // HTTP status code associated with the error
  payload: unknown; // Additional details or context about the error
}
