import { GridColDef, DataGrid, GridActionsCellItem, GridRowParams, GridRowId } from "@mui/x-data-grid"
import { Order } from "../../Model/Order"
import storeConfig from '../../Config/StoreConfig.json'
import EditIcon from '@mui/icons-material/Edit';
import Assignment from '@mui/icons-material/AssignmentTurnedIn';
import Delivery from '@mui/icons-material/LocalShipping';
import Visibility from '@mui/icons-material/Visibility';
import OrderCard from "../Forms/OrderCard";
import { ReactNode, useState } from "react";
import ModalWindow from "../Common/ModalWindow";
import { Box } from "@mui/material";
import { OrderStatus } from "../../Model/OrderStatus";
import { useSelectorUserState } from "../../Redux/store";
import { UserData } from "../../Model/UserData";


type Props = {
    orders:Order[]
    changeStatusFn: (order:Order, status:OrderStatus) => Promise<void>
}


const DELIVERY_STATUS = 'Delivery';
const CLOSED_STATUS = 'Closed';
const RECEIVED_STATUS = 'Received';
const PROCESSING_STATUS = 'Processing';


const OrdersGridAdmin:React.FC<Props> = (props) => {
    const currentUser:UserData = useSelectorUserState()
    const [orderCardForm, setOrderCardForm] = useState<ReactNode>()
    const [active, setActive] = useState<boolean>(false)

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'email', headerName: 'EMAIL', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        { field: 'date', headerName: 'DATE', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center', type:'date'},
        { field: 'phone', headerName: `PHONE(${storeConfig.currencyOfPrice})`, type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'delivery', headerName: 'DELIVERY TO', type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'orderForGrid', headerName: 'PRODUCTS' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        { field: 'status', headerName: 'STATUS' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        {
            field: 'actions',headerName: '', type: 'actions',flex:0.2,
            getActions: (params:GridRowParams) => [
                <GridActionsCellItem disabled = {params.row.status == CLOSED_STATUS} onClick={() => openOrderCard(params.id)} icon={<Visibility/>} label="Edit"/>,
                <GridActionsCellItem disabled = {params.row.status !== PROCESSING_STATUS}  onClick={() => changeStatus(params.id, DELIVERY_STATUS)} icon={<Delivery/>} label="Delivery"/>,
                <GridActionsCellItem  disabled = {params.row.status == DELIVERY_STATUS||params.row.status == CLOSED_STATUS} onClick = {() => changeStatus(params.id, CLOSED_STATUS)} icon={<Assignment/>} label="Closed"/> 
            ]
        }
    ]


    async function openOrderCard(id:GridRowId) {
        const index = props.orders.findIndex((order) => order.id == id)
        const orderCard:ReactNode = <OrderCard role = {currentUser.role} changeStatusFn={changeStatusInForm} order={props.orders[index]}></OrderCard>
        setOrderCardForm(orderCard)
        setActive(true)
    }

    async function changeStatus(id:GridRowId, status:OrderStatus){
        const index = props.orders.findIndex((order) => order.id == id)
        await props.changeStatusFn(props.orders[index],status)
    }

    function changeStatusInForm(order:Order, status:OrderStatus){
        props.changeStatusFn(order,status)
        setActive(false)
    }

    return <Box>
        <ModalWindow active = {active} element = {orderCardForm} setActive={setActive}></ModalWindow>
                <DataGrid sx = {{width:'100%'}} columns={columns} rows={props.orders}></DataGrid>
            </Box>
} 

export default OrdersGridAdmin