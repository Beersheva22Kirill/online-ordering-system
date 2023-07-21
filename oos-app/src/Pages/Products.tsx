import { Box, TextField, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { stockService, categoryService} from "../Config/service-config"
import { Product } from "../Model/Product"
import { Subscription } from "rxjs";
import ProductList from "../Components/ProductList";
import CategoryesBar from "../Components/FilterComponent/CategoryesBar";
import { Category } from "../Model/Category";
import { log } from "console";

const ON_SALE = 'onSale'

const Products:React.FC = () => {

    const defaultTheme = createTheme();
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

    const [productsSale, setProducts] = useState<Product[]>([]);
    const [categoryes, setCategoryes] = useState<Category[]>([]);
    const [currentCategories, setCurrentCategoryes] = useState<Category|undefined>()

    useEffect(() => {
        const subscription: Subscription = stockService.getProductsByStatus(ON_SALE,currentCategories).subscribe({
            next(productArr:Product[]|string){     
                if (typeof productArr !== 'string') {
                    const productForSale = productArr.filter(pr => pr.count > 0)
                    setProducts(productForSale)
                } 
            }
        })
        return () => subscription.unsubscribe();
    },[currentCategories])

    

    useEffect(() => {
        const subscription: Subscription = categoryService.getAllCategoryes().subscribe({
            next(categoryArr:Category[]|string){     
                if (typeof categoryArr !== 'string') {
                    setCategoryes(categoryArr)
                } 
            }
        })
        return () => subscription.unsubscribe();
    },[])


   async function callBackCategoryBar(id:any){
        setCurrentCategoryes(id ? await categoryService.getCategoryById(id) : undefined)
        console.log(currentCategories); 
    }


    return <Box sx={{display:'flex',flexDirection:"column", alignItems:'center' , height:'80vh', overflowY:'auto'}}>
                <Box sx={{display:'flex', flexDirection:smallDisplay ? 'column-reverse' : 'row', marginTop:0.8}}>
                    <CategoryesBar callback={callBackCategoryBar} categoryes={categoryes.sort((a,b) => a.name.localeCompare(b.name))}></CategoryesBar> 
                    <TextField label = 'Search'></TextField>
                </Box>
    
                <Box sx={{width:'90vw'}}>
                    <ProductList products={productsSale}></ProductList>
                </Box>
            </Box>
}

export default Products;