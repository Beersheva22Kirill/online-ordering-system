import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "../../Model/Product";
import storeConfig from "../../Config/StoreConfig.json"

type Props = {
    orderProduct:Product[];
}

const PreOrderGrid:React.FC<Props> = (props) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'NAME', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        { field: 'price', headerName: `PRICE(${storeConfig.currencyOfPrice})`, type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'count', headerName: 'COUNT', type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'status', headerName: 'STATUS' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'}
    ]


    return  <DataGrid sx = {{width:'100%'}} columns={columns} rows={props.orderProduct}></DataGrid>
}

export default PreOrderGrid;