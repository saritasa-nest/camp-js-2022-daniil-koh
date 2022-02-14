import { CollectionDocument } from '../Interfaces/collectionDocument';
import { getData, getSortedDataByKey } from '../firestore/firestoreOperations';

/**
 * Get formatted data with id of doc.
 * @param collectionName Name of collection.
 * @param sortKey Key of sorting.
 */
export function getFormattedCollectionDataWithId<T>(collectionName: string, sortKey?: string): Promise<CollectionDocument<T>[]> {
  let func;
  if (sortKey !== undefined) {
    func = () => getSortedDataByKey(collectionName, sortKey);
  } else {
    func = () => getData(collectionName);
  }
  return func().then(docSnap => docSnap.docs.map(document => ({
    dataDTO: document.data(),
    id: document.id,
  } as CollectionDocument<T>)));
}
