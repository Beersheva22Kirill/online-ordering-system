import { GridColDef, DataGrid, GridActionsCellItem, GridRowParams, GridRowId } from "@mui/x-data-grid"
import { Order } from "../../Model/Order"
import storeConfig from '../../Config/StoreConfig.json'
import { ReactNode, useEffect, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import CheckCircle from '@mui/icons-material/CheckCircle';
import OrderCard from "../Forms/OrderCard";
import { useSelectorUserState } from "../../Redux/store";
import { UserData } from "../../Model/UserData";
import { OrderStatus } from "../../Model/OrderStatus";
import { Box } from "@mui/material";
import ModalWindow from "../Common/ModalWindow";

type Props = {
    orders:Order[];
    changeStatusFn: (order:Order, status:OrderStatus) => void
}
const RECEIVED_STATUS = 'Received';
const PROCESSING_STATUS = 'Processing';
const CLOSED_STATUS = 'Closed'

const MyOrdersGrid:React.FC<Props> = (props) => {
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
        { field: 'sumOrder', headerName: 'SUM ORDER' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', type: 'number'},
        { field: 'status', headerName: 'STATUS' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        {
            field: 'actions',headerName: '', type: 'actions',flex:0.2,
            getActions: (params:GridRowParams) => [
                <GridActionsCellItem disabled = {params.row.status === RECEIVED_STATUS ||params.row.status === CLOSED_STATUS} onClick={() => openOrderCard(params.id)} icon={<EditIcon/>} label="Edit"/>,
                <GridActionsCellItem disabled = {params.row.status === PROCESSING_STATUS||params.row.status === CLOSED_STATUS} onClick={() => changeStatus(params.id, RECEIVED_STATUS)} icon={<CheckCircle/>} label="Received"/> 
            ]
        }
   
    ]

    async function openOrderCard(id:GridRowId) {
        const index = props.orders.findIndex((order) => order.id == id)
        const orderCard:ReactNode = <OrderCard role = {currentUser.role} changeStatusFn={changeStatusInForm} order={props.orders[index]}></OrderCard>
        setOrderCardForm(orderCard)
        setActive(true)
    }

    function getStatus(id:GridRowId) {
        
    }

    function changeStatus(id:GridRowId, status:OrderStatus){
        const index = props.orders.findIndex((order) => order.id == id)
        props.changeStatusFn(props.orders[index],status)
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

export default MyOrdersGrid