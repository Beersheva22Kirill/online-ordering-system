import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { stockService } from "../Config/service-config"
import { Product } from "../Model/Product"
import { Subscription } from "rxjs";
import ProductList from "../Components/ProductList";

const Products:React.FC = () => {

    const [productsSale, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const subscription: Subscription = stockService.getProducts().subscribe({
            next(productArr:Product[]|string){
                
                if (typeof productArr !== 'string') {
                    const productsOfSales:Product[] = productArr.filter(product =>product.status === "onSale")
                    setProducts(productsOfSales)
                } 
            }
        })
        return () => subscription.unsubscribe();
    },[])


    return <Box sx={{display:'flex',flexDirection:"column"}}>
                <Box>
                    <Typography variant="h4">Products in shop</Typography>
                </Box>
    
                <Box sx={{width:'90vw'}}>
                    <ProductList products={productsSale}></ProductList>
                </Box>
            </Box>
}

export default Products;