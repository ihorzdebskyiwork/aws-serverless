/**
 * Generic type representing a paginated repository response.
 * @template T - The type of the items in the paginated response.
 */
export type IRepositoryPaginated<T> = {
  items: T; // The list of items in the current page
  cursor: Record<string, unknown>; // The cursor for the next page of results
};
