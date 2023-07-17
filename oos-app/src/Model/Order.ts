import { OrderStatus } from "./OrderStatus"
import { Product } from "./Product"


export type Order = {
    id?:any,
    date:Date,
    email:string,
    uid:string,
    delivery:string,
    phone:string,
    order:Product[],
    orderForGrid?:string[],
    sumOrder:number,
    status:OrderStatus
}