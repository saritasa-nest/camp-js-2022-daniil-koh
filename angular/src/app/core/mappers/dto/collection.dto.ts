/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Parent interface for db collections.
 */
export interface CollectionDto<T> {

  /**
   * Id of item.
   */
  readonly pk: number;

  /**
   * Model of item.
   */
  readonly model: string;

  /**
   * Fields of collection.
   */
  readonly fields: T;
}
