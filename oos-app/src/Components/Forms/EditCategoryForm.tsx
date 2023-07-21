import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box, FormControl, InputLabel, Select, MenuItem, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Button, useMediaQuery, useTheme } from "@mui/material"
import { Category } from '../../Model/Category';
import { DataGrid } from '@mui/x-data-grid';
import CategoryGrid from '../Grids/CategoryGrid';

type Props = {
    category:Category;
    uploadImg:(file:File) => Promise<string>
    updFunction:(category:Category,id:any) => void
}

const EditCategoryForm:React.FC<Props> = (props) => {

    const linkImage = props.category && props.category.imgPath ? props.category.imgPath : null
    const defaultTheme = createTheme();
      
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const imgCategory:File = formData.get('image') as File
        let imgPath = undefined
        if(imgCategory.size > 0){
            imgPath = await props.uploadImg(imgCategory)
        }
        const newCategory:Category = {
            id:props.category.id,
            name:`${formData.get("CategoryName")}`,
            imgPath:imgPath ? imgPath : props.category.imgPath
        }
        props.updFunction(newCategory,props.category.id)
    }


    return <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
    
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display:'flex'}}>
 
            <Box> 
                <Box sx = {{display:'flex', flexDirection: smallDisplay ? 'column' : 'row', justifyContent:'center'}}>
                    <TextField sx={{width: '300px', marginRight: smallDisplay ? 0 : 2}} 
                        name = "CategoryName" 
                        id="filled-basic" 
                        label="Category name" 
                        variant="filled" required 
                        defaultValue={props.category ? props.category.name : null}/>   
                </Box>   

                <Box sx = {{display: 'flex', justifyContent: 'center'}}>
                    <Button type="submit"
                        variant="contained"
                        sx={{ mt: 2, mb: 1 }}>Submit
                    </Button>
                </Box>
            </Box> 
            <Box sx={{display:'flex', flexDirection:'column', width: '200px'}}>
                <Button variant="contained" component="label">Upload Image 
                    <input name = 'image' type="file" hidden/>
                </Button>
                <img src={linkImage ? linkImage : '#'} style={{width:'100%'}}></img>
            </Box> 
        </Box>
    </Box> 
    </Container>
</ThemeProvider>
}

export default EditCategoryForm;