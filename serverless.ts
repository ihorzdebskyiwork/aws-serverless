import { databaseConstants } from '@constants';
import {
  reminderResponseModel,
  remindersListResponseModel,
  createReminderRequestModel,
  updateReminderRequestModel,
  notFoundErrorModel,
  baseServerErrorModel,
  validationErrorModel,
  baseSuccessModel,
} from '@docs';
import { reminderFunctions, scheduledFunctions } from '@functions';
import { reminderModel } from '@models';
import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';

import { environment } from './serverless.env';

import type { AWS as ServerlessAWS } from '@serverless/typescript';

// Load environment variables
const { aws, awsDatabase, deployment } = envUtil.getEnv();

// Configure AWS SDK
AWS.config.update(aws);

/**
 * Serverless Framework configuration for the Reminders API.
 */
const serverlessConfiguration: ServerlessAWS = {
  service: 'reminders-api',
  frameworkVersion: '3',

  // Plugins used in the Serverless Framework
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-offline',
    'serverless-openapi-documenter',
  ],

  // Provider configuration
  provider: {
    name: 'aws',
    stage: deployment.stage,
    runtime: 'nodejs16.x',
    region: aws.region,
    apiGateway: {
      minimumCompressionSize: 512, // Enable compression for responses larger than 512 bytes
      shouldStartNameWithService: true,
    },
    environment: environment, // Inject environment variables

    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:DeleteItem',
        ],
        Resource: `arn:aws:dynamodb:${aws.region}:*:table/${databaseConstants.DatabaseTableNames.REMINDERS}`,
      },
    ],
  },

  // Parameters for different stages
  params: {
    default: {
      domain: deployment.devDomain,
    },
    prod: {
      domain: deployment.prodDomain,
    },
    dev: {
      domain: deployment.devDomain,
    },
  },

  // Custom configurations for plugins
  custom: {
    'serverless-offline': {
      httpPort: 4000, // Port for offline development
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'], // Exclude AWS SDK from bundling
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: false,
        migrate: awsDatabase.migrate, // Use migration option from environment
      },
      stages: deployment.stage,
    },
    documentation: {
      version: '1',
      title: 'Reminders API',
      description: 'API for managing reminders',
      models: [
        reminderResponseModel,
        remindersListResponseModel,
        createReminderRequestModel,
        updateReminderRequestModel,
        notFoundErrorModel,
        baseServerErrorModel,
        validationErrorModel,
        baseSuccessModel,
      ],
    },
  },

  // Functions configuration
  functions: { ...reminderFunctions, ...scheduledFunctions },

  // Package configuration
  package: {
    individually: true, // Package each function individually
  },

  // Resources configuration
  resources: {
    Resources: { ...reminderModel },
  },
};

module.exports = serverlessConfiguration;
