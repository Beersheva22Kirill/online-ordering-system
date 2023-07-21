import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material"
import { Order } from "../../Model/Order"
import { OrderStatus } from "../../Model/OrderStatus"
import { useState } from "react"
import ProductList from "../ProductList"
import OrderCardGrid from "../Grids/OrderCardGrid"
import { getISODateStr } from "../../utils/date-functions"

type Props = {
    order: Order;
    changeStatusFn: (order:Order, status:OrderStatus) => void;
    role:string;
}


const OrderCard:React.FC<Props> = (props) => {
    const [status, setStatus] = useState<OrderStatus>(props.order ? props.order.status : 'Processing');


    const defaultTheme = createTheme();
      
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));


    const handlerConfirm = () => {
        props.changeStatusFn({...props.order, date:new Date(props.order.date)},status);
    }
    
    return <Box>
        <Box>
            <Typography variant="h6">{`Client: ${props.order.email}`}</Typography>
            <Typography variant="h6">{`Order number: ${props.order.id}`}</Typography>
            <Typography variant="h6">{`Order date: ${getISODateStr(new Date(props.order.date))}`}</Typography>
            <Typography variant="h6">{`Total sum: ${props.order.sumOrder}`}</Typography>
        </Box>

        <Box>
        <TextField sx={{width: '300px', margin:2}} 
                                            name = "Adress" 
                                            id="filled-basic" 
                                            label="Delivery adress" 
                                            variant="filled" 
                                            value = {props.order.delivery} required/>
        <TextField sx={{width: '300px', margin:2}} 
                                            name = "Phone" 
                                            id="filled-basic" 
                                            label="Phone number" 
                                            variant="filled" 
                                            value = {props.order.phone}required/>
        </Box>
        <Box>
            <OrderCardGrid orderProduct={props.order.order}></OrderCardGrid>
        </Box>
        <Box mt = {1} sx = {{display:'flex', flexDirection: "column", alignItems: "center"}}>
                    <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                        <RadioGroup sx={{display:'flex', flexDirection: smallDisplay ? 'column' : 'row'}}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={props.order ? props.order.status: 'Processing'}
                                    name="radio-buttons-group">
                            <FormControlLabel 
                                        onClick={() => setStatus('Delivery')} 
                                        value="Delivery" 
                                        control={<Radio />} 
                                        label="Delivery"
                                        disabled = {(props.role !== 'admin' && props.order.status ==='Processing') || (props.order.status ==='Received') } />
                            {props.role !== 'admin' && <FormControlLabel 
                                        onClick={() => setStatus("Received")} 
                                        value="Received"
                                        control={<Radio />} 
                                        label="Received"
                                        disabled = {props.order.status ==='Processing'}/>}
                            {props.role === 'admin' && <FormControlLabel 
                                        onClick={() => setStatus("Closed")} 
                                        value="Closed"
                                        control={<Radio />} 
                                        label="Closed"
                                        disabled = {props.order.status ==='Delivery'}/>}
                            
                        </RadioGroup>
                </Box>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button variant="contained" onClick={handlerConfirm}>Confirm</Button>
                </Box>
           

    </Box>
}

export default OrderCard