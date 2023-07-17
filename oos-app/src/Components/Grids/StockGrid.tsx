import { Box } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid"
import { Product } from "../../Model/Product"
import { ReactNode, useState } from "react"
import { stockService } from "../../Config/service-config"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ProductCard from "../Forms/ProductCard"
import Confirmation from "../Common/Confirmation"
import ModalWindow from "../Common/ModalWindow"
import storeConfig from "../../Config/StoreConfig.json"

type Props = {
    products: Product[],
    updProductFunction: (product:Product, id:any) => void
    getProductFunction:(id:any) => Promise<Product>;
    delProductFunction: (id:any) => void;
    uploadImageFunction: (file:File) => Promise<string>;
}

const StockGrid:React.FC<Props> = (props) => {

    const [activeForm, setActiveForm] = useState<boolean>(false)
    const [activeConfirm, setActiveConfirm] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<ReactNode>()
    const [title, setTitle] = useState<string>('')
    const [content,setContent] = useState<string>('')
    const [id,setId] = useState<any>()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'NAME', flex: 0.3, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        { field: 'category', headerName: 'CATEGORY' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        { field: 'price', headerName: `PRICE(${storeConfig.currencyOfPrice})`, type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'count', headerName: 'COUNT', type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'status', headerName: 'STATUS' ,flex: 0.3, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
        {
            field: 'actions',headerName: '', type: 'actions',flex:0.2,
            getActions: (params:GridRowParams) => [
                <GridActionsCellItem onClick={() => {openEditForm(params.id)}} icon={<EditIcon/>} label="Edit"/>,
                <GridActionsCellItem onClick={() => openConfirm(params.id)} icon={<DeleteIcon/>} label="Delete"/> 
            ]
        }
    ]

    async function openConfirm(id:GridRowId){
        try {
            const product:Product = await props.getProductFunction(id)
            setTitle(`Remove product ${product.name} with id: ${product.id} from table`)
            setContent('Recovering is not possible after deleting product')
            setActiveConfirm(true)
            setId(id)
        } catch (error:any) {
             
        }
       
    }

    function deleteProduct(){
        props.delProductFunction(id)
    }

    function updateProduct(product:Product){
        props.updProductFunction(product,product.id)
    }

    function uploadImage(file:File){
        return props.uploadImageFunction(file)
    }

    async function openEditForm(id:GridRowId) {
        try {
            const product:Product = await props.getProductFunction(id)
            const form:ReactNode = <ProductCard callBackUploadImg={uploadImage} callBackSubmit={updateProduct} modalClose={setActiveForm} product={product}></ProductCard>
                         
            setEditForm(form);
            setActiveForm(true);
        } catch (error:any) {
            
        }
       
    }

    return <Box style={{width:'90%'}}>
                <Confirmation active = {activeConfirm} callbackAgree={deleteProduct} content={content} question = {title} setActive={setActiveConfirm}></Confirmation>
                <ModalWindow active = {activeForm} element = {editForm} setActive={setActiveForm}></ModalWindow>
                <DataGrid 
                    rows={props.products}
                    columns={columns}/>
            </Box>
}

export default StockGrid;