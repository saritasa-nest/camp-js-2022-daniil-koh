import {CollectionInterface} from "../interfaces/collectionInterface";
import {getData} from "../firestore";
import {DocumentData, QuerySnapshot} from "firebase/firestore";

export const formateCollectionData = async (path: string): Promise<CollectionInterface[]> => {
  const data: CollectionInterface[] = [];
  const docSnap: QuerySnapshot<DocumentData> = await getData(path)
  docSnap.forEach(document => {
    const {pk, model, ...fields} = <CollectionInterface>document.data();
    let item: CollectionInterface = {
      pk,
      model,
      ...fields
    }
    data.push(item)
  })
  return data
}
