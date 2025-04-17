import { envUtil } from '@utils';

// Destructure environment variables from the utility
const { aws, awsDatabase, recipient, mailer, deployment } = envUtil.getEnv();

/**
 * Environment variables for the Serverless Framework.
 * These variables are injected into the runtime environment.
 */
export const environment = Object.freeze({
  // AWS Node.js configuration
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1', // Reuse connections for better performance
  NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000', // Enable source maps and increase stack trace limit

  // AWS global configuration
  AWS_API_VERSION: aws.apiVersion,
  AWS_API_ACCESS_KEY_ID: aws.accessKeyId,
  AWS_API_SECRET_ACCESS_KEY: aws.secretAccessKey,
  AWS_API_REGION: aws.region,

  // AWS database configuration
  AWS_DATABASE_API_VERSION: awsDatabase.apiVersion,
  AWS_DATABASE_ENDPOINT: awsDatabase.endpoint,
  AWS_DATABASE_MIGRATION_OPTION: String(awsDatabase.migrate), // Convert boolean to string

  // Recipient configuration
  RECIPIENT_EMAIL: recipient.recipientEmails.join(','), // Join recipient emails into a comma-separated string

  // Mailer configuration
  SENDER_EMAIL: mailer.senderEmail,
  MAILER_AWS_API_VERSION: mailer.apiVersion,

  // Debugger configuration
  DEBUG: '*', // Enable all debug logs

  // Deployment configuration
  DOMAIN: deployment.prodDomain,
  DOMAIN_DEV: deployment.devDomain,
  STAGE: deployment.stage,
});
