import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Product } from "../../Model/Product";
import storeConfig from "../../Config/StoreConfig.json"
import { useEffect, useState } from "react";

type Props = {
    orderProduct:Product[];
   
}

const OrderCardGrid:React.FC<Props> = (props) => {

    const [productArr, setProductArr] = useState<any>([])

    useEffect(() => {
       const array = props.orderProduct.map((pr) => {
        const productForGrid = {...pr,sum:pr.count! * pr.price}
        return productForGrid
       })
       setProductArr(array)
    })

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'NAME', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        { field: 'price', headerName: `PRICE(${storeConfig.currencyOfPrice})`, type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'count', headerName: 'COUNT', type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'sum', headerName: 'SUMM' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'}
    ]


    return <DataGrid columns={columns} rows={productArr}></DataGrid>
}

export default OrderCardGrid