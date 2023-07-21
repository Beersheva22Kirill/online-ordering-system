import { Box, Button, Typography } from "@mui/material"
import { ReactNode, useEffect, useState } from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import ProductCard from "../Components/Forms/ProductCard";
import { Product } from "../Model/Product";
import { stockService, categoryService } from "../Config/service-config";
import StockGrid from "../Components/Grids/StockGrid";
import { Subscriber, Subscription } from "rxjs";
import CategoryForm from "../Components/Forms/CategoryForm";
import { Category } from "../Model/Category";


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
    

// Categoryes
    const [categoryes,setCategoryes] = useState<Category[]>([])

    async function uploadImageCategory(file:File) {
        
        return await categoryService.uploadImage(file);
    }

    async function addCategory(category:Category) {
        await categoryService.addCategory(category)
    }

    async function updateCategory(category:Category, id:any) {
        await categoryService.updateCategory(category, id)
    }

    async function deleteCategory(id:any) {
        await categoryService.delcategoryes(id)
    }

    async function getCategoryById(id:any) {
        return await categoryService.getCategoryById(id)
    }


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

 
    const [activeCategoryForm,setActiveCategoryForm] = useState<boolean>(false)
    const categoryForm:ReactNode = <CategoryForm allCategoryes={categoryes} addCategory={addCategory} deleteFn={deleteCategory} getCategory={getCategoryById} updCategory={updateCategory} uploadImage={uploadImageCategory} ></CategoryForm>

    const [active, setActive] = useState<boolean>(false)
    const productCard:ReactNode = <ProductCard callBackGetCategory={getCategoryById} categoryes={categoryes.sort((a,b) => a.name.localeCompare(b.name))} callBackUploadImg={uploadImage} modalClose={setActive} callBackSubmit={addProduct}></ProductCard>

    return <Box sx={{display:'flex', flexDirection:'column',alignItems: 'center'}}>
        <Box>
            <Button onClick={() => setActive(true)}>Add poduct</Button>
            <Button onClick={() => setActiveCategoryForm(true)}>Category</Button>
        </Box>
                <ModalWindow active = {activeCategoryForm} element = {categoryForm} setActive={setActiveCategoryForm}></ModalWindow>
                <ModalWindow active = {active} element = {productCard} setActive={setActive}></ModalWindow>
                <Box sx={{width: "90vw",display:'flex', justifyContent:'center'}}>
                    <StockGrid getCategoryById={getCategoryById} categoryes={categoryes} uploadImageFunction={uploadImage} products={products} getProductFunction={getProduct} updProductFunction={updateProduct} delProductFunction={deleteProduct}></StockGrid>
                </Box>
                
        </Box>
}

export default Stock;