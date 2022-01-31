import { DocumentData, QuerySnapshot } from 'firebase/firestore';

import { CollectionInterface } from '../interfaces/collectionInterface';
import { getData, getSortedByData } from '../firestore';

/**
 * Get and formate data.
 * @param collectionName Name of collection.
 * @param sortKey Key of sorting.
 */
export async function formateCollectionData(collectionName: string, sortKey?: string): Promise<CollectionInterface[]> {
  const data: CollectionInterface[] = [];
  let func;
  if (typeof (sortKey) !== 'undefined') {
    func = () => getSortedByData(collectionName, sortKey);
  } else {
    func = () => getData(collectionName);
  }
  const docSnap: QuerySnapshot<DocumentData> = await func();
  docSnap.forEach(document => {
    const { pk, model, ...fields } = <CollectionInterface>document.data();
    const item: CollectionInterface = {
      pk,
      model,
      ...fields,
    };
    data.push(item);
  });
  return data;
}
