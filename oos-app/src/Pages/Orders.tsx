import { Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { Subscriber, Subscription } from "rxjs";
import { orderService } from "../Config/service-config";
import { Order } from "../Model/Order";
import { useSelectorUserState } from "../Redux/store";
import OrdersGridAdmin from "../Components/Grids/OrdersGridAdmin";


const Orders:React.FC = () => {
    
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const subscription: Subscription = orderService.getOrders().subscribe({
            next(orderArr:Order[]|string) {
                if (typeof orderArr !== 'string'){
                    setOrders(orderArr)
                } else {

                }
               
               }
        })

    },[])
    return <OrdersGridAdmin orders={orders.map(order => ({...order,date:new Date(order.date)}))}></OrdersGridAdmin>
}

export default Orders;