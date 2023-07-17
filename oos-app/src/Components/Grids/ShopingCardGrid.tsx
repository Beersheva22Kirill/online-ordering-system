import { Box } from "@mui/material"
import { Product } from "../../Model/Product"
import ModalWindow from "../Common/ModalWindow"
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid"
import { title } from "process"
import Confirmation from "../Common/Confirmation"
import storeConfig from "../../Config/StoreConfig.json"

type Props ={
    array:Product[]
}

const ShopingCardGrid:React.FC<Props> = (props)=> {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'NAME', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        { field: 'category', headerName: 'CATEGORY' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        { field: 'price', headerName: `PRICE(${storeConfig.currencyOfPrice})`, type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'count', headerName: 'COUNT', type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
    ]

    

    return <Box style={{width:'90%'}}>
                <DataGrid 
                    rows={props.array}
                    columns={columns}/>
                </Box>

}

export default ShopingCardGrid;