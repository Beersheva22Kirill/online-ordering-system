import { Product } from "../../../Model/Product";
import { Observable } from "rxjs";
import { ProductStatus } from "../../../Model/ProductStatus";
import { Category } from "../../../Model/Category";

export interface StockService {

    addProduct(product:Product):Promise<Product>;
    getProducts():Observable<Product[]|string>;
    getProductById(id:any):Promise<Product>;
    updateProduct(product:Product, id:any):Promise<Product|string>;
    deleteProduct(id:any):Promise<void|string>;
    uploadImage(file:File):Promise<string>;
    getProductsByStatus(status:ProductStatus,category?:Category):Observable<Product[]|string>;
    

}