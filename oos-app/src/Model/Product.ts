import { Category } from "./Category";
import { ProductStatus } from "./ProductStatus";

 export type Product = {
    id?:any;
    category:Category;
    name:string,
    price:number,
    count:number,
    imagePath?:string,
    status:ProductStatus
}