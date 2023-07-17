import { GridColDef, DataGrid } from "@mui/x-data-grid"
import { Order } from "../../Model/Order"
import storeConfig from '../../Config/StoreConfig.json'
import { useEffect, useState } from "react"

type Props = {
    orders:Order[]
}


const MyOrdersGrid:React.FC<Props> = (props) => {
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'email', headerName: 'EMAIL', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        { field: 'date', headerName: 'DATE', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center', type:'date'},
        { field: 'phone', headerName: `PHONE(${storeConfig.currencyOfPrice})`, type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'delivery', headerName: 'DELIVERY TO', type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'orderForGrid', headerName: 'PRODUCTS' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        { field: 'sumOrder', headerName: 'SUM ORDER' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', type: 'number'},
        { field: 'status', headerName: 'STATUS' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'}
    ]


    return <DataGrid sx = {{width:'100%'}} columns={columns} rows={props.orders}></DataGrid>
} 

export default MyOrdersGrid