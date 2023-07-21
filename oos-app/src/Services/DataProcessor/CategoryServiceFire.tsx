import { Category } from "../../Model/Category";
import { CategoryService } from "./interfaces/CategoryesService";
import {StorageReference, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { doc,getDoc,getFirestore, collection, DocumentReference, CollectionReference, setDoc, FirestoreError, deleteDoc, where, query} from "firebase/firestore"
import { Observable, catchError, of } from "rxjs";
import { getRandomInt } from "../../utils/numbers";
import { oosApp, storage } from "../../Config/firebase-config"
import { collectionData } from "rxfire/firestore";

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


export class CategoryServiceFire implements CategoryService{

    private categoryes: CollectionReference = collection(getFirestore(oosApp), 'Categoryes')

    async addCategory(category: Category): Promise<string | Category> {
        const id:string = await this.getId();
        const docRef = this.getDocReference(id);
        try {
            await setDoc(docRef, {...category,id})
        } catch (error:any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return category
    }

    async getCategoryById(id: any): Promise<Category> {
        const docRef:DocumentReference = this.getDocReference(id);
        const docSnapShot = await getDoc(docRef);
        return docSnapShot.data() as Category
    }

    getAllCategoryes(): Observable<string | Category[]> {
        return collectionData(this.categoryes).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string|Category[]>
    }

    async delcategoryes(id: any): Promise<void|string> {
        if (!await this.exists(id)) {
            return 'Not found'
        }
        const docRef:DocumentReference = this.getDocReference(id);
        await deleteDoc(docRef);
    }

    async updateCategory(category: Category, id: any): Promise<Category | string> {
        if(!await this.exists(id)){
            return 'Not found'
        }
        const docRef = this.getDocReference(id);
        try {
            await setDoc(docRef, {...category, id})
        } catch (error:any) {
            
        }
        return category;
    }
    
    async uploadImage(file: File): Promise<string> {
        let res  = ''
        const storageImageRef:StorageReference = ref(storage,`categoryes/${Date.now()}.psd`);
        try {
             await uploadBytes(storageImageRef,file)
             res = await getDownloadURL(storageImageRef)
             
        } catch (error) {
          
        }
        return res;
    }


    private async exists(id:string):Promise<boolean> {
        const docRef:DocumentReference = this.getDocReference(id);
        const docSnapShot = await getDoc(docRef);
        return docSnapShot.exists()
    }

    private getDocReference(id:string):DocumentReference{
        return doc(this.categoryes,id)
    }

     private async getId():Promise<string>{
        let id:string  = '';
        do{
            id = getRandomInt(MIN_ID,MAX_ID).toString()
        }while(await this.exists(id))
        
        return id
    }

}