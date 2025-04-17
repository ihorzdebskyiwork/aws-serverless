import { databaseConstants } from '@constants';

/**
 * DynamoDB table definition for the Reminders table.
 */
export const reminderModel = {
  RemindersTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: databaseConstants.DatabaseTableNames.REMINDERS,
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }, // Primary key
        { AttributeName: 'sendDate', AttributeType: 'N' }, // Secondary index
        { AttributeName: 'createdAt', AttributeType: 'N' }, // Secondary index
        { AttributeName: 'reminderType', AttributeType: 'N' }, // Secondary index
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: databaseConstants.DatabaseIndexNames.TIME_INDEX,
          KeySchema: [
            { AttributeName: 'sendDate', KeyType: 'HASH' }, // Partition key for the index
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
        {
          IndexName: databaseConstants.DatabaseIndexNames.SORT_INDEX,
          KeySchema: [
            { AttributeName: 'reminderType', KeyType: 'HASH' }, // Partition key for the index
            { AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sort key for the index
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
    },
  },
};