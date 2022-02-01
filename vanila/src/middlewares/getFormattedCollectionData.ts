import { DocumentData, QuerySnapshot } from 'firebase/firestore';

import { CollectionDTO } from '../DTO/collectionDTO';
import { getData, getSortedDataByKey } from '../firestore/firestoreOperations';

/**
 * Get formatted data.
 * @param collectionName Name of collection.
 * @param sortKey Key of sorting.
 */
export async function getFormattedCollectionData<T>(collectionName: string, sortKey?: string): Promise<CollectionDTO<T>[]> {
  const data: CollectionDTO<T>[] = [];
  let func;
  if (sortKey !== undefined) {
    func = () => getSortedDataByKey(collectionName, sortKey);
  } else {
    func = () => getData(collectionName);
  }
  const docSnap: QuerySnapshot<DocumentData> = await func();
  docSnap.forEach(document => {
    data.push(<CollectionDTO<T>>document.data());
  });
  return data;
}
