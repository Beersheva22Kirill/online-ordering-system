import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { Category } from "../../Model/Category"
import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import Confirmation from "../Common/Confirmation";
import ModalWindow from "../Common/ModalWindow";
import EditCategoryForm from "../Forms/EditCategoryForm";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    categoryes:Category[];
    getCategoryFunction:(id:any) => Promise<Category>
    deleteCategoryFunction:(id:any) => Promise<void>
    updCategoryFunction: (category:Category, id:any) => void
    uploadImageFunction: (file:File) => Promise<string>;

}
const CategoryGrid:React.FC<Props> = (props) => {

    const [editForm, setEditForm] = useState<ReactNode>()
    const [activeEdit,setActiveEdit] = useState(false)
    const [activeConfirm, setActiveConfirm] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [content,setContent] = useState<string>('')
    const [id,setId] = useState<any>()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'NAME', headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
        {field:'imgPath', headerName:'PICTURE', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', renderCell: (params) => <img style={{width:'30px'}} src={params.value} />},
        {
            field: 'actions',headerName: 'Action', type: 'actions' ,
            getActions: (params:GridRowParams) => [
                <GridActionsCellItem onClick={() => openEditForm(params.id)} icon={<EditIcon/>} label="Edit"/>,
                <GridActionsCellItem onClick={() => openConfirm(params.id)} icon={<DeleteIcon/>} label="Delete"/> 
            ]
        }
    ]

    async function openConfirm(id:GridRowId){
        try {
            const category:Category = await props.getCategoryFunction(id)
            setTitle(`Remove product ${category.name} with id: ${category.id} from table`)
            setContent('Recovering is not possible after deleting product')
            setActiveConfirm(true)
            setId(id)
        } catch (error:any) {
             
        }
       
    }

    async function openEditForm(id:GridRowId) {
        try {
            const category:Category = await props.getCategoryFunction(id)
            const form:ReactNode = <EditCategoryForm category={category} updFunction={updateCategory} uploadImg={uploadImage}></EditCategoryForm>       
            setEditForm(form);
            setActiveEdit(true);
        } catch (error:any) {
            
        }
       
    }

    function deleteCategory(){
        try {
            props.deleteCategoryFunction(id)
        } catch (error) {
            
        }
    }

    function updateCategory(category:Category){
        props.updCategoryFunction(category,category.id)
    }

    function uploadImage(file:File){
        return props.uploadImageFunction(file)
    }



    return <Box sx={{width:'100%',height:300, overflowY:'auto'}}>
                <ModalWindow element={editForm} active={activeEdit} setActive={setActiveEdit}></ModalWindow>
                <Confirmation active = {activeConfirm} callbackAgree={deleteCategory} content={content} question = {title} setActive={setActiveConfirm}></Confirmation>
                <DataGrid columns={columns} rows={props.categoryes}></DataGrid>
            </Box>
}

export default CategoryGrid;