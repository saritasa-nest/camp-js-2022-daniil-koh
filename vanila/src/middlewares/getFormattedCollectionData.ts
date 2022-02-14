import { CollectionDTO } from '../DTO/collectionDTO';
import { getData, getSortedDataByKey } from '../firestore/firestoreOperations';

/**
 * Get formatted data.
 * @param collectionName Name of collection.
 * @param sortKey Key of sorting.
 */
export function getFormattedCollectionData<T>(collectionName: string, sortKey?: string): Promise<CollectionDTO<T>[]> {
  let func;
  if (sortKey !== undefined) {
    func = () => getSortedDataByKey(collectionName, sortKey);
  } else {
    func = () => getData(collectionName);
  }
  return func().then(docSnap => docSnap.docs.map(document => <CollectionDTO<T>>document.data()));
}
