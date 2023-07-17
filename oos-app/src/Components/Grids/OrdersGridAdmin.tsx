import { GridColDef, DataGrid, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid"
import { Order } from "../../Model/Order"
import storeConfig from '../../Config/StoreConfig.json'
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    orders:Order[]
}


const OrdersGridAdmin:React.FC<Props> = (props) => {
    
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
                <GridActionsCellItem  icon={<EditIcon/>} label="Edit"/>,
                <GridActionsCellItem  icon={<DeleteIcon/>} label="Delete"/> 
            ]
        }
    ]

    return <DataGrid sx = {{width:'100%'}} columns={columns} rows={props.orders}></DataGrid>
} 

export default OrdersGridAdmin