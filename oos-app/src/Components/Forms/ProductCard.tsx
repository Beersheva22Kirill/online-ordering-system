import { Box, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import storeConfig from "../../Config/StoreConfig.json"
import { Product } from "../../Model/Product";
import { ProductStatus } from "../../Model/ProductStatus";
import { Category } from "../../Model/Category";

type Props = {
    callBackSubmit: (product:Product,id?:any) => void
    callBackUploadImg:(file:File) => Promise<string>;
    callBackGetCategory:(id:any) => Promise<Category>
    modalClose?:(active: boolean) => void,
    product?:Product; 
    categoryes:Category[]
    
}

const ProductCard:React.FC<Props> = (props) => {
    const linkImage = props.product && props.product.imagePath ? props.product.imagePath : null
    const [category, setCategory] = useState<Category>(props.product ? props.product.category : {name:''});  
    const [statusPr, setStatusPr] = useState<ProductStatus>(props.product ? props.product.status : 'inStock');
      
    const handleChange = async (event: SelectChangeEvent) => {
        const category:Category = await props.callBackGetCategory(event.target.value) as Category
        setCategory(category);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       const data = new FormData(event.currentTarget);
       const product: Product = {
        category: category,
        name: `${data.get('ProductName')}`,
        price: Number.parseInt(`${data.get('price')}`),
        count: Number.parseInt(`${data.get('count')}`),
        status: statusPr,
       }  
       const image:File = data.get('image') as File

       if(image.size > 0){
            product.imagePath = await props.callBackUploadImg(image);
       } else {
            product.imagePath = linkImage ? linkImage : ''
       } //FEXME

       if(props.product){
        product.id = props.product.id
       }

       props.callBackSubmit(product)  
       
       if(props.modalClose) {
            props.modalClose(false) 
        }     
      };

      const defaultTheme = createTheme();
      
      const theme = useTheme();
      const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

      

    return  <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display:'flex'}}>
                 
                 <Box> 
                    <Box sx = {{display:'flex', flexDirection: smallDisplay ? 'column' : 'row', justifyContent:'center'}}>
                    <FormControl sx={{marginTop: 1, width:"300px", marginRight: 2}} fullWidth>
                        <InputLabel  id="demo-simple-select-label">Category</InputLabel>
                            <Select 
                                    name="category"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Category"
                                    defaultValue={props.product ? props.product.category.id : ''}
                                    onChange={handleChange} required>
                                    {props.categoryes.map((item:Category) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                            </Select>
                    </FormControl>
                    
                    <TextField sx={{width: '300px', marginRight: smallDisplay ? 0 : 2}} 
                    name = "ProductName" 
                    id="filled-basic" 
                    label="Product name" 
                    variant="filled" required 
                    defaultValue={props.product ? props.product.name : null}/>   
                </Box>   
                
                <Box sx = {{marginTop: 1, display:'flex', flexDirection: smallDisplay ? 'column' : 'row', justifyContent:'center'}}>
                    
                    
                        <TextField inputProps={{}} 
                        sx={{width: '300px', marginRight: smallDisplay ? 0 : 2}} 
                        name = "price"
                        id="filled-basic" 
                        label= {`price(${storeConfig.currencyOfPrice})`} 
                        type = 'number' 
                        variant="filled" required
                        defaultValue={props.product ? props.product.price : null} />
                  

                    
                        <TextField inputProps={{}} 
                        sx={{width: '300px', marginRight: smallDisplay ? 0 : 2}} 
                        name = "count" 
                        id="filled-basic" 
                        label="Count" 
                        type = 'number' 
                        variant="filled" required
                        defaultValue={props.product ? props.product.count : null} />
                    
                    
                </Box>
                <Box mt = {1} sx = {{display:'flex', flexDirection: "column", alignItems: "center"}}>
                    <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                        <RadioGroup sx={{display:'flex', flexDirection: smallDisplay ? 'column' : 'row'}}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={props.product ? props.product.status: 'inStock'}
                                    name="radio-buttons-group">
                            <FormControlLabel 
                                        onClick={() => setStatusPr('inStock')} 
                                        value="inStock" 
                                        control={<Radio />} 
                                        label="in stock" />
                            <FormControlLabel 
                                        onClick={() => setStatusPr("onSale")} 
                                        value="onSale"
                                        control={<Radio />} 
                                        label="on Sale" />
                        </RadioGroup>
                </Box>
                
                <Box sx = {{display: 'flex', justifyContent: 'center'}}>
                    <Button type="submit"
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}>Submit
                    </Button>
                </Box>
                </Box> 
                <Box sx={{display:'flex', flexDirection:'column', width: '200px'}}>
                <Button variant="contained" component="label">
                    Upload Image 
                    <input
                        name = 'image'
                        type="file"
                        hidden/>
                    {/* <TextField style = {{width:'200px'}} name = 'image' type="file" placeholder="Select image" hidden/> */}
                </Button>
                    <img src={linkImage ? linkImage : '#'} style={{width:'100%'}}></img>
                 </Box> 
        </Box>
        
                        </Box> 
                    </Container>
            </ThemeProvider>
               
                     
                    
    
            
                   
}

export default ProductCard;