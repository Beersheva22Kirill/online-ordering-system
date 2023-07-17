import { useSelectorUserState } from "../Redux/store";
import { ReactNode, useEffect, useState } from "react";
import { ShopingCardType } from "../Model/ShopingCardType";
import { Subscriber, Subscription } from "rxjs";
import {shopingCardService,stockService,orderService} from "../Config/service-config"
import { Product } from "../Model/Product";
import { Box, Button, Typography } from "@mui/material";
import ShopingCardList from "../Components/ShopingCardList";
import { UserData } from "../Model/UserData";
import ModalWindow from "../Components/Common/ModalWindow";
import OrderForm from "../Components/Forms/OrderForm";
import { OrderData } from "../Model/OrderData";
import { Order } from "../Model/Order";



const ShopingCard:React.FC = () => {

    const currentUser:UserData = useSelectorUserState();
  
    const [products, setProducts] = useState<Product[]>([])
    const [totalSum, setTotalSum] = useState<number>(0)
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [formOrder, setFormOrder] = useState<ReactNode>()

    useEffect(() => {
        const subscription: Subscription = shopingCardService.getProductsFromCard(currentUser.uid).subscribe({
            async next(productShopArr:ShopingCardType|string) {
                if(typeof productShopArr !== 'string'){
                    const selectedProducts:Product[] = []
                    let shopingCardSum:number = 0;
                    if(productShopArr && productShopArr.card){
                        for (let index = 0; index < productShopArr.card.length; index++) {
                            const productData = await stockService.getProductById(productShopArr.card[index].idProduct)
                            productData.count = productShopArr.card[index].count
                            shopingCardSum += productData.price * productShopArr.card[index].count
                            selectedProducts.push(productData)
                         }
                            setProducts(selectedProducts)
                            setTotalSum(shopingCardSum)
                    } else {
                        setProducts([])
                        setTotalSum(0)
                    }
            
                    }     
                }
        })

    },[])

    function deleteProductFromCard(id:any){
        console.log(currentUser.uid, id);
        
        shopingCardService.delFromCard(currentUser.uid,id)
    }

    async function heandlerOrders(products:Product[],orderData:OrderData) {
        const ordersForGrid:string[] = products.map(item => `/${item.name}-count:${item.count} price:${item.price}/`)
            
                
        const order:Order = {
            email: orderData.email,
            date: new Date(),
            delivery:orderData.delivetyAdress,
            phone:orderData.phone,
            order:products,
            orderForGrid:ordersForGrid,
            uid:`${currentUser.uid}`,
            sumOrder:totalSum,
            status:"Processing"
        }
        try {
            const idOrder = await orderService.addOrder(order)
            if(idOrder){
                const idProductFromDel = products.map(item => item.id)
                shopingCardService.delProductsFromCard(currentUser.uid,idProductFromDel)
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    }



    const heandlerOrder = () => {
        const formOrder:ReactNode = <OrderForm totalSum={totalSum} callbackOrder={heandlerOrders} orderProducts={products} user={currentUser}></OrderForm>
        setFormOrder(formOrder)
        setActiveModal(true)
    }

    return <Box sx={{display:'flex',flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
            <ModalWindow active ={activeModal} element={formOrder} setActive={setActiveModal}></ModalWindow>
                <Box>
                    <Typography variant="h4">Shoping card</Typography>
                </Box>
                
                <Box>
                    <Button onClick={heandlerOrder} variant="contained">To order</Button>
                </Box>
                <Box sx={{width:'90vw'}}>
                    <ShopingCardList totalSum={totalSum} callBackDelItem={deleteProductFromCard} products={products}></ShopingCardList>
                </Box>
        </Box>
}

export default ShopingCard;