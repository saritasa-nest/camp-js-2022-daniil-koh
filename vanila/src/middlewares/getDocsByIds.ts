import { getDocSnapByIds } from '../firestore/firestoreOperations';
import { CollectionDTO } from '../DTO/collectionDTO';

/**
 * Get docs by ids.
 * @param docsIds Document ids.
 * @param collectionName Name of collection in db.
 */
export function getDocsByIds<T>(collectionName: string, docsIds: string[]): Promise<CollectionDTO<T>[]> {
  return getDocSnapByIds(collectionName, docsIds)
    .then(docSnaps => docSnaps.map(docSnap => docSnap.docs.map(doc => <CollectionDTO<T>> doc.data())))
    .then(content => content.flat());
}
