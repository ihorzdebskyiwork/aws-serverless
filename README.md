# Reminders API

A serverless API for managing reminders.

## Initial Setup

1. Install dependencies:

   ```bash
   npm install
   npm run setup
   ```

2. Install the local DynamoDB database:

   ```bash
   npx serverless dynamodb install
   ```

3. A `.env` file will be created in the working directory. Fill in the missing values based on the `example.env` file.

   - Ensure that your `.env` file is kept up to date with any changes in `example.env`.

## Getting Started

Run the development server:

```bash
npm run dev
```

This will start the server locally using `serverless-offline`.

## Building the Project

To build the project for deployment:

```bash
npm run build
```

This will package the application using the Serverless Framework.

## Testing

To run all tests, including TypeScript checks, linting, and formatting:

```bash
npm test
```

## Documentation

To generate API documentation:

```bash
npm run docs
```

This will generate `openapi.json` and `postman.json` files in the project root directory.

## Formatting and Linting

- To check code formatting:

  ```bash
  npm run format
  ```

- To fix linting issues:

  ```bash
  npm run lint:fix
  ```

## Notes

- Ensure you are using Node.js version `>=14.15.0` as specified in the `package.json` file.
- For production deployment, ensure all environment variables are correctly configured.
