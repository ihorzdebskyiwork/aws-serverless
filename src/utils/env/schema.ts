import { object, array, string, boolean } from 'yup';
import { AwsRegionEnum } from './env.type';

/**
 * Utility function to generate validation messages for environment variables.
 * @param field - The name of the environment variable.
 * @param type - The expected type of the environment variable.
 * @returns A formatted validation message.
 */
const validationMessage = (field: string, type: string): string =>
  `Invalid value for ${field}. Expected a ${type} in the .env file.`;

/**
 * Schema for validating AWS configuration.
 */
const awsSchema = object().shape({
  apiVersion: string()
    .required(validationMessage('AWS_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_API_VERSION', 'string')),
  accessKeyId: string()
    .required(validationMessage('AWS_API_ACCESS_KEY_ID', 'string'))
    .typeError(validationMessage('AWS_API_ACCESS_KEY_ID', 'string')),
  secretAccessKey: string()
    .required(validationMessage('AWS_API_SECRET_ACCESS_KEY', 'string'))
    .typeError(validationMessage('AWS_API_SECRET_ACCESS_KEY', 'string')),
  region: string()
    .oneOf(Object.values(AwsRegionEnum))
    .required(validationMessage('AWS_API_REGION', 'valid AWS region'))
    .typeError(validationMessage('AWS_API_REGION', 'valid AWS region')),
});

/**
 * Schema for validating AWS database configuration.
 */
const awsDatabaseSchema = object().shape({
  apiVersion: string()
    .required(validationMessage('AWS_DATABASE_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_DATABASE_API_VERSION', 'string')),
  endpoint: string()
    .required(validationMessage('AWS_DATABASE_ENDPOINT', 'string'))
    .typeError(validationMessage('AWS_DATABASE_ENDPOINT', 'string')),
  migrate: boolean().default(false),
});

/**
 * Schema for validating recipient configuration.
 */
const recipientSchema = object().shape({
  recipientEmails: array()
    .of(string().email(validationMessage('RECIPIENT_EMAIL', 'valid email')))
    .min(1, validationMessage('RECIPIENT_EMAIL', 'non-empty email array'))
    .required(validationMessage('RECIPIENT_EMAIL', 'email array'))
    .typeError(validationMessage('RECIPIENT_EMAIL', 'email array')),
});

/**
 * Schema for validating mailer configuration.
 */
const mailerSchema = object().shape({
  senderEmail: string()
    .email(validationMessage('SENDER_EMAIL', 'valid email'))
    .required(validationMessage('SENDER_EMAIL', 'email string'))
    .typeError(validationMessage('SENDER_EMAIL', 'email string')),
  apiVersion: string()
    .required(validationMessage('MAILER_AWS_API_VERSION', 'string'))
    .typeError(validationMessage('MAILER_AWS_API_VERSION', 'string')),
});

/**
 * Schema for validating deployment configuration.
 */
const deploymentSchema = object().shape({
  prodDomain: string()
    .required(validationMessage('DOMAIN', 'string'))
    .typeError(validationMessage('DOMAIN', 'string')),
  devDomain: string().typeError(validationMessage('DOMAIN_DEV', 'string')),
  stage: string()
    .oneOf(['dev', 'prod'], validationMessage('STAGE', 'either "dev" or "prod"'))
    .required(validationMessage('STAGE', 'string')),
});

/**
 * Schema for validating the entire environment configuration.
 */
export const envSchema = object()
  .shape({
    aws: awsSchema,
    awsDatabase: awsDatabaseSchema,
    recipient: recipientSchema,
    mailer: mailerSchema,
    deployment: deploymentSchema,
  })
  .noUnknown(true, 'Unknown keys are not allowed in the environment configuration.');
