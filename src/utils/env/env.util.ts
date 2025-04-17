import { config } from 'dotenv';
import { AwsRegionEnum } from './env.type';
import { envSchema } from './schema';

import type { IEnv } from './env.type';

// Load environment variables from .env file
config();

/**
 * Utility functions for mapping environment variable values.
 */
const mapEnvValues = {
  bool: (envValue: string): boolean => envValue === 'true',
  number: (envValue: string, defaultValue: number): number => {
    const value = Number(envValue);
    return Number.isNaN(value) ? defaultValue : value;
  },
  array: (envValue: string, delimiter = ','): string[] =>
    envValue.split(delimiter).filter(Boolean),
  includes: (
    envValue?: string,
    values: string[] = [],
    defaultValue?: string,
  ): string => {
    if (!envValue) {
      return defaultValue ?? '';
    }
    return values.includes(envValue) ? envValue : defaultValue ?? '';
  },
};

/**
 * Maps environment variables to a strongly-typed configuration object.
 * @returns A frozen object containing the parsed environment configuration.
 */
const mapEnv = (): IEnv => {
  const parsed: IEnv = {
    aws: {
      apiVersion: process.env.AWS_API_VERSION ?? '',
      accessKeyId: process.env.AWS_API_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_API_SECRET_ACCESS_KEY ?? '',
      region: mapEnvValues.includes(
        process.env.AWS_API_REGION,
        Object.values(AwsRegionEnum),
        AwsRegionEnum.euCentral1,
      ) as AwsRegionEnum,
    },
    awsDatabase: {
      apiVersion: process.env.AWS_DATABASE_API_VERSION ?? '',
      endpoint: process.env.AWS_DATABASE_ENDPOINT ?? '',
      migrate: mapEnvValues.bool(process.env.AWS_DATABASE_MIGRATION_OPTION ?? 'false'),
    },
    recipient: {
      recipientEmails: mapEnvValues.array(process.env.RECIPIENT_EMAIL ?? ''),
    },
    mailer: {
      senderEmail: process.env.SENDER_EMAIL ?? '',
      apiVersion: process.env.MAILER_AWS_API_VERSION ?? '',
    },
    deployment: {
      prodDomain: process.env.DOMAIN ?? '',
      devDomain: process.env.DOMAIN_DEV ?? '',
      stage: process.env.STAGE ?? '',
    },
  };

  return Object.freeze(parsed); // Ensure immutability of the configuration object
};

let env: IEnv;

/**
 * Retrieves the environment configuration.
 * Validates the configuration against the schema and caches the result.
 * @returns A readonly environment configuration object.
 */
export const getEnv = (): Readonly<IEnv> => {
  if (!env) {
    env = mapEnv();
    envSchema.validateSync(env); // Validate the configuration using the schema
  }
  return env;
};
