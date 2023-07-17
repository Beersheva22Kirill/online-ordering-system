import { Product } from "../../../Model/Product";
import { Observable } from "rxjs";
import { ShopingCardType } from "../../../Model/ShopingCardType";

export interface ShoppingCard {

    addToCard(idProduct:any, uid:any):Promise<void>;
    getProductsFromCard(uid:any):Observable<ShopingCardType|string>;  
    delFromCard(uid:any,idProduct:any):Promise<void|string>;
    delProductsFromCard(uid:any,idProducts:any[]):Promise<void|string>;
    
}