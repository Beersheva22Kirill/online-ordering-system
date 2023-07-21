import { Box, Button } from "@mui/material"
import { OrderStatus } from "../../Model/OrderStatus"
import { useProps } from "@mui/x-data-grid/internals"

type Props = {
    function:(status:OrderStatus|'all') => void;
}

const DELIVERY = 'Delivery'
const PROCESSING = 'Processing'
const  RECEIVED = 'Received'
const  CLOSED = 'Closed'




const OrderStatusBar:React.FC<Props> = (props) => {


    const handlerDelivery = () => {
        props.function(DELIVERY)
    }
    
    const handlerReceived = () => {
        props.function(RECEIVED)
    }
    
    const handlerClosed = () => {
        props.function(CLOSED)
    }

    const handlerProcessing = () => {
        props.function(PROCESSING)
    }
    
    const handlerAll = () => {
        props.function('all')
    }

    return <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
            <Button onClick={handlerAll}>All orders</Button>
            <Button onClick={handlerProcessing}>{PROCESSING}</Button>
            <Button onClick={handlerDelivery}>{DELIVERY}</Button>
            <Button onClick={handlerReceived}>{RECEIVED}</Button>
            <Button onClick={handlerClosed}>{CLOSED}</Button>
    </Box>
}

export default OrderStatusBar


