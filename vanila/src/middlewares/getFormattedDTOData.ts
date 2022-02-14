import { getFilm } from '../firestore/firestoreOperations';
import { CollectionDTO } from '../DTO/collectionDTO';

/**
 * Get film bi Id.
 * @param id Film id.
 */
export function getFormattedDTOData<T>(id: string): Promise<CollectionDTO<T>> {
  return getFilm(id).then(doc => <CollectionDTO<T>>doc.data());
}
