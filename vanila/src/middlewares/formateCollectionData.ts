import { DocumentData, QuerySnapshot } from 'firebase/firestore';

import { CollectionInterface } from '../interfaces/collectionInterface';
import { getData, getSortedByData } from '../firestore';

export async function formateCollectionData(path: string, sortKey?: string): Promise<CollectionInterface[]> {
  const data: CollectionInterface[] = [];
  let func;
  if (typeof (sortKey) !== 'undefined') {
    func = () => getSortedByData(path, sortKey);
  } else {
    func = () => getData(path);
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
