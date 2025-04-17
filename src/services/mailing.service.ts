import { emailDtoCreators } from '@dto-creators';
import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';

import type { IMail } from '@dto';

const { mailer, aws } = envUtil.getEnv();
const sesClient = new AWS.SES({ ...aws, apiVersion: mailer.apiVersion });

/**
 * Sends an email using AWS SES.
 * @param message - The email details including recipients, content, and title.
 * @returns A promise that resolves when the email is sent successfully.
 */
const sendEmail = async (message: IMail): Promise<AWS.SES.SendEmailResponse> => {
  const email = emailDtoCreators.createAwsEmail(message);
  return sesClient.sendEmail(email).promise();
};

const mailingService = { sendEmail };

export default mailingService;