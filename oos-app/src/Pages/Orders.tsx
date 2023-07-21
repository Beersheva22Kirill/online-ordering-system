import { Box, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { Subscriber, Subscription } from "rxjs";
import { orderService } from "../Config/service-config";
import { Order } from "../Model/Order";
import { useSelectorUserState } from "../Redux/store";
import OrdersGridAdmin from "../Components/Grids/OrdersGridAdmin";
import { OrderStatus } from "../Model/OrderStatus";
import { UserData } from "../Model/UserData";
import OrderStatusBar from "../Components/FilterComponent/OrderStatusBar";


const Orders:React.FC = () => {
    const currentUser:UserData = useSelectorUserState()
    const [orders, setOrders] = useState<Order[]>([])
    const [currentStatus,setCurrentStatus] = useState<OrderStatus|'all'>('all')

    useEffect(() => {
        const subscription: Subscription = orderService.getOrders(currentStatus).subscribe({
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
            <OrdersGridAdmin changeStatusFn={updateStatus} orders={orders.map(order => ({...order,date:new Date(order.date)}))}></OrdersGridAdmin>
        </Box>
}

export default Orders;