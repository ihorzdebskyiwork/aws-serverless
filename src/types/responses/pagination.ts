/**
 * Generic type representing a paginated response.
 * @template T - The type of the items in the paginated response.
 */
export type IPaginationResponse<T> = {
  items: T; // The list of items in the current page
  cursor?: string; // Optional cursor for the next page of results
};
