/**
 * Middleware for handling successful responses in AWS Lambda functions.
 * It formats the response with a 200 status code and JSON stringified body.
 */
const responseHandler = {
  after: (handler) => {
    return {
      statusCode: 200, // HTTP success status code
      body: JSON.stringify(handler.response), // Stringify the response body
    };
  },
};

export default responseHandler;
