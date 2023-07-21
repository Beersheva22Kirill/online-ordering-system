import { Box, Typography } from "@mui/material"
import MyOrdersGrid from "../Components/Grids/MyOrdersGrid";
import { useSelectorUserState } from "../Redux/store";
import { useState, useEffect } from "react";
import { orderService} from "../Config/service-config";
import { Order } from "../Model/Order";
import { ShopingCardType } from "../Model/ShopingCardType";
import { Subscriber, Subscription } from "rxjs";
import OrderStatusBar from "../Components/FilterComponent/OrderStatusBar";
import { OrderStatus } from "../Model/OrderStatus";

const MyOrders:React.FC = () => {
    const currentUser = useSelectorUserState()

    const [orders, setOrders] = useState<Order[]>([])
    const [currentStatus,setCurrentStatus] = useState<OrderStatus|'all'>('all')

    useEffect(() => {
        const subscription: Subscription = orderService.getOrdersByUser(currentUser.uid,currentStatus).subscribe({
            next(orderArr:Order[]|string) {
                if (typeof orderArr !== 'string'){
                    setOrders(orderArr)
                } else {

                }
               
               }
        })

    },[currentStatus])

    function handlerStatus(status:OrderStatus|'all'){
        setCurrentStatus(status)
    }

    async function updateStatus(order:Order, status:OrderStatus) {
        try {
            await orderService.changeStatus(order,status)
        } catch (error) {
            
        }
    }


    return <Box>
        <Box>
            <OrderStatusBar function={handlerStatus}></OrderStatusBar>
        </Box>
            <MyOrdersGrid changeStatusFn={updateStatus} orders={orders.map(order => ({...order,date:new Date(order.date)}))}></MyOrdersGrid>
        </Box>
}

export default MyOrders;