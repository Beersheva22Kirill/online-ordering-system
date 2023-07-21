import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box, FormControl, InputLabel, Select, MenuItem, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Button, useMediaQuery, useTheme } from "@mui/material"
import { Category } from '../../Model/Category';
import { DataGrid } from '@mui/x-data-grid';
import CategoryGrid from '../Grids/CategoryGrid';

type Props = {
    addCategory:(category:Category) => Promise<void>
    deleteFn:(id:any) => Promise<void>
    getCategory:(id:any) => Promise<Category>
    updCategory:(category:Category,id:any) => void
    uploadImage:(file:File) => Promise<string>
    allCategoryes:Category[];
    category?:Category;
}

const CategoryForm:React.FC<Props> = (props) => {

    const linkImage = props.category && props.category.imgPath ? props.category.imgPath : null
    const defaultTheme = createTheme();
      
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

    


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const imgCategory:File = formData.get('image') as File
        let imgPath = ''
        if(imgCategory.size > 0){
            imgPath = await props.uploadImage(imgCategory)
        }
        const newCategory:Category = {
            name:`${formData.get("CategoryName")}`,
            imgPath:imgPath
        }
        props.addCategory(newCategory)
    }


    return <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <Box sx={{display:'flex', flexDirection:'column', width: '200px'}}>
                <Button variant="contained" component="label">Upload Image 
                    <input name = 'image' type="file" hidden/>
                </Button>
            </Box> 
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display:'flex'}}>
            
            <Box sx = {{display:'flex', flexDirection: smallDisplay ? 'column' : 'row', justifyContent:'center'}}> 
                <Box sx = {{display:'flex', flexDirection: smallDisplay ? 'column' : 'row', justifyContent:'center'}}>
                    <TextField sx={{width: smallDisplay ? '200px' :'300px'}} 
                        name = "CategoryName" 
                        id="filled-basic" 
                        label="Category name" 
                        variant="filled" required 
                        defaultValue={props.category ? props.category.name : null}/>   
                </Box>   

                <Box sx = {{display: 'flex', justifyContent: 'center'}}>
                    <Button type="submit"
                        variant="contained" sx={{marginLeft:2, width:'170px'}}>add category
                    </Button>
                </Box>
            </Box> 
            
        </Box>
         <Box sx={{marginTop:4}}>
            <CategoryGrid categoryes={props.allCategoryes} deleteCategoryFunction={props.deleteFn} getCategoryFunction={props.getCategory} updCategoryFunction={props.updCategory} uploadImageFunction={props.uploadImage}></CategoryGrid>
        </Box>   
        
    </Box> 
    </Container>
</ThemeProvider>
}

export default CategoryForm;