import { Observable } from "rxjs";
import { Order } from "../../../Model/Order";
import { OrderStatus } from "../../../Model/OrderStatus";

export interface OrderService {

    addOrder(order:Order):Promise<string|null>
    changeStatus(order:Order,status:OrderStatus):Promise<void>
    closeOrder(order:Order):Promise<void>
    getOrdersByUser(uid:any):Observable<Order[]|string>;
    getOrders():Observable<Order[]|string>;
}
