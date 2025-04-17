/**
 * Interface representing the structure of a reminder response.
 */
export interface IReminderResponse {
  id: string; // Unique identifier for the reminder
  title: string; // Title of the reminder
  sendDate: Date; // Date and time when the reminder is scheduled to be sent
  createdAt: Date; // Timestamp when the reminder was created
  updatedAt: Date; // Timestamp when the reminder was last updated
}
