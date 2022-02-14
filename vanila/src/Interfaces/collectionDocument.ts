import { CollectionDTO } from '../DTO/collectionDTO';

/** Document with id and data. */
export interface CollectionDocument<T>{

  /** Document data. */
  readonly dataDTO: CollectionDTO<T>;

  /** Document id. */
  readonly id: string;
}
