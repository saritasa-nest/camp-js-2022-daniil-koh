/**
 * Film detail data with id.
 */
export interface DocumentDataWithId<T> {

  /** Id of film detail.*/
  readonly id: string;

  /** Data of film detail.*/
  readonly data: T;
}
