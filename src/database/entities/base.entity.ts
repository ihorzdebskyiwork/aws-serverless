/**
 * Base attributes for all entities.
 * `id` is a unique identifier, while `createdAt` and `updatedAt` track timestamps.
 */
export interface IBaseAttributes {
  readonly id: string; // Immutable unique identifier
  readonly createdAt: Date; // Immutable creation timestamp
  updatedAt: Date; // Mutable update timestamp
}

/**
 * Represents an entity to be created, combining the base attributes with additional properties.
 * @template T - The specific entity type.
 */
export type IEntityToCreate<T> = T & Omit<IBaseAttributes, 'updatedAt'>;

/**
 * Represents an entity to be updated, allowing partial updates while requiring `updatedAt`.
 * @template T - The specific entity type.
 */
export type IEntityToUpdate<T> = Partial<T> & Pick<IBaseAttributes, 'updatedAt'>;
