import { envUtil } from '@utils';
import type { IMail } from '@dto';

const env = envUtil.getEnv();

/**
 * Creates an AWS SES email object from the given mail data.
 * @param mail - The email details including recipients, content, and title.
 * @returns An object formatted for AWS SES.
 */
const createAwsEmail = (mail: IMail) => {
  const { recipients, htmlContent, textContent, title } = mail;

  return {
    Destination: {
      ToAddresses: recipients, // List of recipient email addresses
    },
    Message: {
      Body: {
        ...(htmlContent
          ? {
              Html: {
                Charset: 'UTF-8',
                Data: htmlContent, // HTML content of the email
              },
            }
          : {}),
        Text: {
          Charset: 'UTF-8',
          Data: textContent ?? '', // Fallback to empty string if textContent is undefined
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: title, // Subject of the email
      },
    },
    Source: env.mailer.senderEmail, // Sender's email address
    ReplyToAddresses: [env.mailer.senderEmail], // Reply-to email address
  };
};

const emailCreator = { createAwsEmail };

export default emailCreator;