import { DocumentData, QuerySnapshot } from 'firebase/firestore';

import { CollectionInterface } from '../interfaces/collectionInterface';
import { getData } from '../firestore';

export const formateCollectionData = async(path: string): Promise<CollectionInterface[]> => {
  const data: CollectionInterface[] = [];
  const docSnap: QuerySnapshot<DocumentData> = await getData(path);
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
};
