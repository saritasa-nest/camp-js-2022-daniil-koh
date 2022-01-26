// import {DocumentData, QuerySnapshot} from "firebase/firestore";
import {CollectionInterface} from "../interfaces/collectionInterface";
import {getData} from "../firestore";

export const formateCollectionData = (path: string): CollectionInterface[] => {
  const data:CollectionInterface[] =[];
  getData(path).then(querSS => querSS.forEach(document => {
     const {pk, model, ...fields}  = <CollectionInterface>document.data();
     let item:CollectionInterface = {
       pk,
       model,
       ...fields
     }
     data.push(item)
   }))
  return data
}
