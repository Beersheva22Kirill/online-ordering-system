import { Observable, catchError, of } from "rxjs";
import { Order } from "../../Model/Order";
import { OrderService } from "./interfaces/OrderService";
import { CollectionReference, DocumentReference, DocumentSnapshot, FirestoreError, collection, doc, getDoc, getFirestore, query, setDoc, where } from "firebase/firestore";
import { oosApp } from "../../Config/firebase-config";
import { getRandomInt } from "../../utils/numbers";
import { log } from "console";
import { OrderStatus } from "../../Model/OrderStatus";
import { collectionData } from "rxfire/firestore";
import { getISODateStr } from "../../utils/date-functions";

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




export class OrderServiceFire implements OrderService {
    

    private orderCollection: CollectionReference = collection(getFirestore(oosApp), 'ordersList')

    private getDocReference(id:string):DocumentReference{
        return doc(this.orderCollection,id)
    }

    async addOrder(order: Order): Promise<string|null> {   
        const idOrder:string = await this.getId();        
        const docRef = this.getDocReference(idOrder);
        const orderForAdd = {...order,date:getISODateStr(order.date)}
        try {
            await setDoc(docRef, {...orderForAdd,id:idOrder})
        } catch (error:any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            console.log(errorMessage);
            
            throw errorMessage;
        }
        return idOrder
           
    }

    async changeStatus(order: Order, status:OrderStatus): Promise<void> {
        const docRef = this.getDocReference(order.id);
        try {
            await setDoc(docRef,{...order,status:status,date:getISODateStr(order.date)} )
        } catch (error) {
            
        }

    }

    closeOrder(order: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getOrdersByUser(uid:any,status:OrderStatus|'all'): Observable<string | Order[]> {
        let queryUidOrders = query(this.orderCollection, where("uid", "==", uid));
        if (status !== 'all') {
            queryUidOrders = query(this.orderCollection, where("uid", "==", uid), where("status", "==", status));
        }
        return collectionData(queryUidOrders).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string|Order[]>
    }

    getOrders(status:OrderStatus|'all'): Observable<string | Order[]> {
        let queryStatusOrders = query(this.orderCollection);
        if (status !== 'all'){
            queryStatusOrders = query(this.orderCollection, where("status", "==", status));
        }
        
        return collectionData(queryStatusOrders).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            return of(errorMessage)
        })) as Observable<string|Order[]>
    }

    private async getId():Promise<string>{
        let id:string  = '';
        do{
            id = getRandomInt(MIN_ID,MAX_ID).toString()
        }while(await this.exists(id))
        
        return id
    }

    private async exists(id:string):Promise<boolean|void> {
        const docRef:DocumentReference = this.getDocReference(id);
        try {
            const docSnapShot:DocumentSnapshot = await getDoc(docRef);
            return docSnapShot.exists()
        } catch (error) {
            console.log(error);
            
        } 
        
    }

    
}