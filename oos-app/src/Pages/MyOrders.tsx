import { Box, Typography } from "@mui/material"
import MyOrdersGrid from "../Components/Grids/MyOrdersGrid";
import { useSelectorUserState } from "../Redux/store";
import { useState, useEffect } from "react";
import { orderService} from "../Config/service-config";
import { Order } from "../Model/Order";
import { ShopingCardType } from "../Model/ShopingCardType";
import { Subscriber, Subscription } from "rxjs";

const MyOrders:React.FC = () => {
    const currentUser = useSelectorUserState()

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const subscription: Subscription = orderService.getOrdersByUser(currentUser.uid).subscribe({
            next(orderArr:Order[]|string) {
                if (typeof orderArr !== 'string'){
                    setOrders(orderArr)
                } else {

                }
               
               }
        })

    },[])




    return <MyOrdersGrid orders={orders.map(order => ({...order,date:new Date(order.date)}))}></MyOrdersGrid>
}

export default MyOrders;