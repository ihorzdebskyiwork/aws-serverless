import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';

let connection: DocumentClient | null = null;

/**
 * Retrieves a DynamoDB DocumentClient instance.
 * Reuses the connection if already established.
 * Uses offline configuration if `IS_OFFLINE` is set in the environment.
 */
const getDynamoDBClient = (): DocumentClient => {
  if (connection) {
    return connection;
  }

  const env = envUtil.getEnv();

  connection = process.env.IS_OFFLINE
    ? new AWS.DynamoDB.DocumentClient({
        ...env.aws,
        ...env.awsDatabase,
      })
    : new AWS.DynamoDB.DocumentClient();

  return connection;
};

export default getDynamoDBClient;
