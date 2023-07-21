import { ShoppingCard } from "./interfaces/ShopingCard";
import { doc,getDoc,getFirestore, collection, DocumentReference, CollectionReference, setDoc, FirestoreError, deleteDoc} from "firebase/firestore"
import { Observable, catchError, of } from "rxjs";
import { oosApp, storage } from "../../Config/firebase-config"
import { Product } from "../../Model/Product"
import { collectionData, docData} from 'rxfire/firestore'
import { ShopingCardProductType } from "../../Model/SopingCardProductType";
import { ShopingCardType } from "../../Model/ShopingCardType";
import { current } from "@reduxjs/toolkit";

function getErrorMessage(firestoreError:FirestoreError):string{
    let errorMessage = '';
    switch (firestoreError.code) {
        case 'unauthenticated':
        case 'permission-denied': errorMessage = 'Authentification'; break   ;
        
        default: errorMessage = firestoreError.message;
           
    }
    return errorMessage;
}


export default class ShoppingCardServiceFire implements ShoppingCard {
    
   
   
    private shoppingCard: CollectionReference = collection(getFirestore(oosApp), 'shoppingCard')

    private getDocReference(uid:string):DocumentReference{
        return doc(this.shoppingCard,uid)
    }

    private async exists(uid:string):Promise<boolean> {
        const docRef:DocumentReference = this.getDocReference(uid);
        const docSnapShot = await getDoc(docRef);
        return docSnapShot.exists()
    }

    async getCardById(uid: any): Promise<ShopingCardType> {
        const docRef:DocumentReference = this.getDocReference(uid);
        const docSnapShot = await getDoc(docRef);
    return docSnapShot.data() as ShopingCardType
    }
    
    async addToCard(idPr: any, count:number, uid: any): Promise<void> {
 
        const product:ShopingCardProductType = {idProduct:idPr, count:count}
        let currentCard:ShopingCardType = {card:[product]};
        if(await this.exists(uid)){
            let flagAdd:boolean = false;
            currentCard = await this.getCardById(uid)
            currentCard.card.forEach(id => {
                if(id.idProduct == idPr){
                    id.count += count
                    flagAdd = true
                }
            })
            if (!flagAdd){
                currentCard.card.push(product)
            }
        }
        const docRef = this.getDocReference(uid);
        await setDoc(docRef,currentCard);
         
    }

    async delFromCard(uid: any, idProduct: any): Promise<string | void> {
       
        try {
            const currentCard = await this.getCardById(uid)
            const index = currentCard.card.findIndex(el => el.idProduct === idProduct)
            
            currentCard.card.splice(index,1)
            const docRef = this.getDocReference(uid);
            if(currentCard.card.length === 0) {
                await deleteDoc(docRef);
            } else {
                setDoc(docRef,currentCard)
            }
        } catch (error:any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
    
    }
    }

    async delProductsFromCard(uid: any, idProducts: any[]): Promise<string | void> {
        const docRef = this.getDocReference(uid);
        const currentCard = await this.getCardById(uid)
        const newCard:ShopingCardType = {card:[]}
        newCard.card = currentCard.card.filter(item => !idProducts.includes(item.idProduct))
        if (newCard.card.length > 0){
            setDoc(docRef,newCard)
        }else {
            await deleteDoc(docRef);
        }
    }   
   

    getProductsFromCard(uid: any): Observable<string | ShopingCardType> {
        return docData(this.getDocReference(uid)).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string|ShopingCardType>
    }
    
}