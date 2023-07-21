import { doc,getDoc,getFirestore, collection, DocumentReference, CollectionReference, setDoc, FirestoreError, deleteDoc, where, query} from "firebase/firestore"
import { Observable, catchError, of } from "rxjs";
import { oosApp, storage } from "../../Config/firebase-config"
import { Product } from "../../Model/Product"
import { getRandomInt } from "../../utils/numbers";
import { collectionData } from 'rxfire/firestore'
import { StockService } from "./interfaces/StockService";
import {StorageReference, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { ProductStatus } from "../../Model/ProductStatus";
import { Category } from "../../Model/Category";

const MIN_ID = 100000;
const MAX_ID = 1000000;

function getErrorMessage(firestoreError:FirestoreError):string{
    let errorMessage = '';
    switch (firestoreError.code) {
        case 'unauthenticated':
        case 'permission-denied': errorMessage = 'Authentification'; break   ;
        
        default: errorMessage = firestoreError.message;
           
    }
    return errorMessage;
}

export default class StockServiceFire implements StockService{

    private stock: CollectionReference = collection(getFirestore(oosApp), 'stock')
      
    async deleteProduct(id: any): Promise<void|string> {
        if (!await this.exists(id)) {
            return 'Not found'
        }
        const docRef:DocumentReference = this.getDocReference(id);
        await deleteDoc(docRef);
        
    }
   
    async updateProduct(product: Product, id: any): Promise<Product|string> {
        if(!await this.exists(id)){
            return 'Not found'
        }
        const docRef = this.getDocReference(id);
        try {
            await setDoc(docRef, {...product, id})
        } catch (error:any) {
            
        }
        return product;
    }
    
    async getProductById(id: any): Promise<Product> {
        const docRef:DocumentReference = this.getDocReference(id);
        const docSnapShot = await getDoc(docRef);
    return docSnapShot.data() as Product
    }

    

    private async exists(id:string):Promise<boolean> {
        const docRef:DocumentReference = this.getDocReference(id);
        const docSnapShot = await getDoc(docRef);
        return docSnapShot.exists()
    }

    private getDocReference(id:string):DocumentReference{
        return doc(this.stock,id)
    }

     private async getId():Promise<string>{
        let id:string  = '';
        do{
            id = getRandomInt(MIN_ID,MAX_ID).toString()
        }while(await this.exists(id))
        
        return id
    }

    async addProduct(product:Product) {
        const id:string = await this.getId();
        const docRef = this.getDocReference(id);
        try {
            await setDoc(docRef, {...product,id})
        } catch (error:any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return product
    }

    getProducts(): Observable<string | Product[]> {
        return collectionData(this.stock).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string|Product[]>
    }

    getProductsByStatus(status:ProductStatus, category?:Category): Observable<string | Product[]> {
        let queryStatus = query(this.stock, where("status", "==", status));
        if (category) {
            queryStatus = query(this.stock, where("status", "==", status),where("category", "==", category));
        }
        return collectionData(queryStatus).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string|Product[]>
    }

    async uploadImage(file:File):Promise<string>{
       let res  = ''
       const storageImageRef:StorageReference = ref(storage,`images/${Date.now()}.jpeg`);
       try {
            await uploadBytes(storageImageRef,file)
            res = await getDownloadURL(storageImageRef)
            
       } catch (error) {
         
       }
       return res;
    }
}