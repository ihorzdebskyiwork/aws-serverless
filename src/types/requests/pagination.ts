/**
 * Generic type representing a pagination request.
 * @template T - Additional parameters specific to the request.
 */
export type IPaginationRequest<T = Record<string, unknown>> = T & {
  limit?: number; // Maximum number of items to retrieve
  cursor?: string; // Cursor for the next page of results
};
