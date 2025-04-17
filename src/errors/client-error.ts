/**
 * Represents a client-side error with an optional payload.
 */
export class ClientError extends Error {
  public statusCode: number;
  public payload: object | null;

  /**
   * Creates an instance of ClientError.
   * @param message - The error message.
   * @param statusCode - The HTTP status code (default: 400).
   * @param payload - Additional error details (optional).
   */
  constructor(message: string, statusCode = 400, payload: object | null = null) {
    super(message); // Pass the message to the base Error class
    this.statusCode = statusCode;
    this.payload = payload;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, ClientError.prototype);
  }
}