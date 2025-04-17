import { databaseConstants } from '@constants';
import getDynamoDBClient from '@database';
import { databaseUtil } from '@utils';

import type { IRepositoryPaginated } from '@dto';
import type { IReminderAttributes } from '@entities';
import type { ReminderTypeEnum } from '@enums';
import type { ICursor } from 'database/types';

const connection = getDynamoDBClient();
const table = databaseConstants.DatabaseTableNames.REMINDERS;

/**
 * Creates a new reminder in the database.
 * @param payload - The reminder attributes to be saved.
 */
const create = async (payload: IReminderAttributes): Promise<void> => {
  await connection
    .put({
      TableName: table,
      Item: payload,
    })
    .promise();
};

/**
 * Updates an existing reminder in the database.
 * @param reminderId - The ID of the reminder to update.
 * @param payload - The partial attributes to update.
 */
const update = async (reminderId: string, payload: Partial<IReminderAttributes>): Promise<IReminderAttributes> => {
  const result = await connection
    .update({
      TableName: table,
      Key: { id: reminderId },
      ...databaseUtil.getUpdatingMeta(payload),
      ReturnValues: databaseConstants.DatabaseReturningType.ALL_NEW,
    })
    .promise();

  return result.Attributes as IReminderAttributes;
};

/**
 * Retrieves a single reminder by its ID.
 * @param reminderId - The ID of the reminder to retrieve.
 */
const getOne = async (reminderId: string): Promise<IReminderAttributes | null> => {
  const result = await connection
    .get({
      TableName: table,
      Key: { id: reminderId },
    })
    .promise();

  return result.Item as IReminderAttributes | null;
};

/**
 * Retrieves a paginated list of reminders by type.
 * @param type - The type of reminders to retrieve.
 * @param limit - The maximum number of items to retrieve.
 * @param cursor - The pagination cursor (optional).
 */
const getList = async (
  type: ReminderTypeEnum,
  limit = 100,
  cursor?: ICursor | null,
): Promise<IRepositoryPaginated<IReminderAttributes[]>> => {
  const params = {
    TableName: table,
    Limit: limit,
    IndexName: databaseConstants.DatabaseIndexNames.SORT_INDEX,
    KeyConditionExpression: 'reminderType = :reminderType',
    ScanIndexForward: true,
    ExpressionAttributeValues: {
      ':reminderType': type,
    },
    ...(cursor ? { ExclusiveStartKey: cursor } : {}),
  };

  const result = await connection.query(params).promise();

  return {
    items: result.Items as IReminderAttributes[],
    cursor: result.LastEvaluatedKey,
  };
};

/**
 * Retrieves a paginated list of reminders by send time.
 * @param sendKey - The send date key to filter reminders.
 * @param limit - The maximum number of items to retrieve.
 * @param cursor - The pagination cursor (optional).
 */
const getListByTime = async (
  sendKey: number,
  limit = 100,
  cursor?: ICursor | null,
): Promise<IRepositoryPaginated<IReminderAttributes[]>> => {
  const queryParams = {
    TableName: table,
    IndexName: databaseConstants.DatabaseIndexNames.TIME_INDEX,
    KeyConditionExpression: 'sendDate = :sendDate',
    ExpressionAttributeValues: {
      ':sendDate': sendKey,
    },
    Limit: limit,
    ...(cursor ? { ExclusiveStartKey: cursor } : {}),
  };

  const result = await connection.query(queryParams).promise();

  return {
    items: result.Items as IReminderAttributes[],
    cursor: result.LastEvaluatedKey,
  };
};

/**
 * Deletes a reminder by its ID.
 * @param reminderId - The ID of the reminder to delete.
 */
const deleteOneById = async (reminderId: string): Promise<void> => {
  await connection
    .delete({
      TableName: table,
      Key: { id: reminderId },
    })
    .promise();
};

const remindersRepository = { create, update, getOne, deleteOneById, getList, getListByTime };

export default remindersRepository;
