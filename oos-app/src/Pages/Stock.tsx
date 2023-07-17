import { Box, Button, Typography } from "@mui/material"
import { ReactNode, useEffect, useState } from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import ProductCard from "../Components/Forms/ProductCard";
import { Product } from "../Model/Product";
import { stockService } from "../Config/service-config";
import StockGrid from "../Components/Grids/StockGrid";
import { Subscriber, Subscription } from "rxjs";


const Stock:React.FC = () => {

    async function uploadImage(file:File) {
        
        return await stockService.uploadImage(file);
    }

    async function addProduct(product:Product) {
        await stockService.addProduct(product)
    }

    async function updateProduct(product:Product, id:any) {
        await stockService.updateProduct(product, id)
    }

    async function deleteProduct(id:any) {
        await stockService.deleteProduct(id)
    }

    async function getProduct(id:any) {
        return await stockService.getProductById(id)
    }

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const subscription: Subscription = stockService.getProducts().subscribe({
            next(productArr:Product[]|string){
                if (typeof productArr !== 'string') {
                    setProducts(productArr)
                } 
            }
        })
        return () => subscription.unsubscribe();
    },[])

    const [active, setActive] = useState<boolean>(false)
    const productCard:ReactNode = <ProductCard callBackUploadImg={uploadImage} modalClose={setActive} callBackSubmit={addProduct}></ProductCard>

    return <Box sx={{display:'flex', flexDirection:'column',alignItems: 'center'}}>
                <Button onClick={() => setActive(true)}>Add poduct</Button>
                <ModalWindow active = {active} element = {productCard} setActive={setActive}></ModalWindow>
                <Box sx={{width: "90vw",display:'flex', justifyContent:'center'}}>
                    <StockGrid uploadImageFunction={uploadImage} products={products} getProductFunction={getProduct} updProductFunction={updateProduct} delProductFunction={deleteProduct}></StockGrid>
                </Box>
                
        </Box>
}

export default Stock;