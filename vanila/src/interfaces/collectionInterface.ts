/**
 * Parent interface for db collections.
 */
export interface CollectionInterface {

  /**
   * Id of item.
   */
  pk: number;

  /**
   *Model of item.
   */
  model: string;
}
