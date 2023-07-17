import { ProductStatus } from "./ProductStatus";

 export type Product = {
    id?:any;
    category:string;
    name:string,
    price:number,
    count?:number,
    imagePath?:string,
    status:ProductStatus
}