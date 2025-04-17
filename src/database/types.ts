/**
 * Represents the payload for updating a DynamoDB item.
 */
export interface IUpdatePayload {
  UpdateExpression: string; // The update expression for DynamoDB
  ExpressionAttributeValues: Record<string, string>; // Attribute values used in the update expression
}

/**
 * Represents a cursor for pagination or other purposes.
 */
export interface ICursor {
  [key: string]: unknown; // A flexible key-value pair structure
}
