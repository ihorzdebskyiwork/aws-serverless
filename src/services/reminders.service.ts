import { errorMessages } from '@constants';
import { reminderDtoCreators } from '@dto-creators';
import { ReminderTypeEnum } from '@enums';
import { ClientError } from '@errors';
import { remindersRepository } from '@repositories';
import { mailingService } from '@services';
import { databaseUtil, timeUtil, envUtil } from '@utils';
import debug from 'debug';

import type { IReminderAttributes } from '@entities';
import type { IPaginationResponse } from '@responses';
import type { ICreateReminderRequest, IPaginationRequest, IUpdateReminderRequest } from '@requests';
import type { IReminderResponse } from '@responses';

const env = envUtil.getEnv();
const logger = debug('app:error');

const reminderHandlers = {
  [ReminderTypeEnum.Email]: async (reminder: IReminderAttributes) =>
    mailingService.sendEmail(
      reminderDtoCreators.toEmailObject(env.recipient.recipientEmails, reminder),
    ),
  [ReminderTypeEnum.Phone]: () => {
    throw new Error('Not implemented yet');
  },
};

/**
 * Processes and sends a single reminder event.
 * @param reminder - The reminder to process.
 */
const sendEvent = async (reminder: IReminderAttributes): Promise<void> => {
  try {
    await reminderHandlers[reminder.reminderType](reminder);
    await remindersRepository.deleteOneById(reminder.id);
  } catch (error) {
    logger('Error processing reminder:', error);
  }
};

/**
 * Processes and sends reminder events in batches.
 */
const sendEvents = async (): Promise<void> => {
  let cursor: string | null = null;
  const limit = 30;
  const filterKey = timeUtil.getMinutelyTimeStamp(new Date());

  do {
    const parsedCursor = cursor ? databaseUtil.parseCursor(cursor) : null;
    const reminders = await remindersRepository.getListByTime(filterKey, limit, parsedCursor);
    await Promise.all(reminders.items.map(sendEvent));
    cursor = reminders.cursor ? JSON.stringify(reminders.cursor) : null;
  } while (cursor);
};

/**
 * Creates a new reminder.
 * @param payload - The reminder creation payload.
 * @returns The created reminder response.
 */
const createReminder = async (payload: ICreateReminderRequest): Promise<IReminderResponse> => {
  const reminder = reminderDtoCreators.toDbObject(payload);
  await remindersRepository.create(reminder);
  return reminderDtoCreators.createReminderResponse(reminder);
};

/**
 * Updates an existing reminder.
 * @param reminderId - The ID of the reminder to update.
 * @param payload - The update payload.
 * @returns The updated reminder response.
 */
const updateReminder = async (
  reminderId: string,
  payload: IUpdateReminderRequest,
): Promise<IReminderResponse> => {
  const updatedReminder = await remindersRepository.update(
    reminderId,
    reminderDtoCreators.toDbUpdateObject(payload),
  );

  if (!updatedReminder) {
    throw new ClientError(errorMessages.notExists('Reminder'), 403);
  }

  return reminderDtoCreators.createReminderResponse(updatedReminder as IReminderAttributes);
};

/**
 * Deletes a reminder by its ID.
 * @param reminderId - The ID of the reminder to delete.
 */
const deleteReminder = async (reminderId: string): Promise<void> => {
  await remindersRepository.deleteOneById(reminderId);
};

/**
 * Retrieves a paginated list of reminders.
 * @param params - The pagination request parameters.
 * @returns The paginated list of reminders.
 */
const getRemindersList = async (
  params: IPaginationRequest<{ reminderType: ReminderTypeEnum }>,
): Promise<IPaginationResponse<IReminderResponse[]>> => {
  const parsedCursor = params.cursor ? databaseUtil.parseCursor(params.cursor) : null;

  const reminders = await remindersRepository.getList(
    params.reminderType,
    params.limit,
    parsedCursor,
  );

  const cursorResponse = reminders.cursor ? databaseUtil.createCursor(reminders.cursor) : null;

  return {
    items: reminderDtoCreators.createRemindersResponse(reminders.items),
    cursor: cursorResponse,
  };
};

/**
 * Retrieves a reminder by its ID.
 * @param reminderId - The ID of the reminder to retrieve.
 * @returns The reminder response.
 */
const getReminderById = async (reminderId: string): Promise<IReminderResponse> => {
  const reminder = await remindersRepository.getOne(reminderId);

  if (!reminder) {
    throw new ClientError(errorMessages.notExists('Reminder'), 403);
  }

  return reminderDtoCreators.createReminderResponse(reminder);
};

const remindersService = {
  createReminder,
  updateReminder,
  deleteReminder,
  getRemindersList,
  getReminderById,
  sendEvents,
};

export default remindersService;
