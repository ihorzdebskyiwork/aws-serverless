/**
 * Interface representing the structure of an email.
 */
export interface IMail {
  recipients: string[]; // List of recipient email addresses
  title: string; // Subject of the email
  textContent?: string; // Optional plain text content of the email
  htmlContent?: string; // Optional HTML content of the email
}
