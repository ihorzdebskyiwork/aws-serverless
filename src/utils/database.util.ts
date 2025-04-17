import type { IUpdatePayload } from 'database/types';

/**
 * Generates the metadata required for a DynamoDB update operation.
 * @param payload - The object containing the fields to update.
 * @returns An object containing the update expression and attribute values.
 */
const getUpdatingMeta = <T extends Record<string, unknown>>(payload: T): IUpdatePayload => {
  let updateExpression = 'set ';
  const expressionAttributeValues: Record<string, unknown> = {};

  for (const key in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      updateExpression += `${key} = :${key}, `;
      expressionAttributeValues[`:${key}`] = String(payload[key]);
    }
  }

  // Remove the trailing comma and space from the update expression
  updateExpression = updateExpression.trim().slice(0, -1);

  return {
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues as Record<string, string>,
  };
};

/**
 * Encodes the last evaluated key into a base64 cursor for pagination.
 * @param lastEvaluatedKey - The last evaluated key from a DynamoDB query.
 * @returns A base64-encoded string representing the cursor.
 */
const createCursor = (lastEvaluatedKey: Record<string, unknown>): string =>
  Buffer.from(JSON.stringify(lastEvaluatedKey)).toString('base64');

/**
 * Decodes a base64 cursor into the original last evaluated key.
 * @param cursor - The base64-encoded cursor string.
 * @returns The original last evaluated key as an object.
 */
const parseCursor = (cursor: string): Record<string, unknown> =>
  JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));

/**
 * Utility functions for working with DynamoDB operations.
 */
const databaseUtil = {
  getUpdatingMeta,
  createCursor,
  parseCursor,
};

export default databaseUtil;
