import { Box, Button, Paper, Typography } from "@mui/material";
import { Product } from "../Model/Product";
import configStore from '../Config/StoreConfig.json'
import { useState } from "react";
import Confirmation from "./Common/Confirmation";

type Props = {
    callBackDel:(id:any, count:number) => void
    product:Product;
}

const ShopingCardItem:React.FC<Props> = (props) => {
    
    const [activeConfirm, setActiveConfirm] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [content,setContent] = useState<string>('')

    const openConfirm = () => {
        setTitle(`Remove product ${props.product.name} from shoping card`)
        setActiveConfirm(true)
        setContent('You can always choose a product again') 
    }

    function deleteProduct(){
        props.callBackDel(props.product.id, props.product.count)
    }


    return <Box>
    <Confirmation active = {activeConfirm} callbackAgree={deleteProduct} content={content} question = {title} setActive={setActiveConfirm}></Confirmation>
    <Paper sx={{ display:'flex', flexDirection:'column', margin: 5, height: 340, width: '80%'}}>
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Typography variant="h6">{props.product.name}</Typography>
        </Box>
        
        <Box sx={{width:'100%', height:'65%', backgroundColor:'lightgreen'}}>
            <img style={{width:'100%', height:'100%'}} src={props.product.imagePath} alt="" />
        </Box>
        <Box>
            <Typography style={{marginLeft:8}} variant="inherit">{`price:${props.product.price}${configStore.currencyOfPrice}`}</Typography>
            <Typography style={{marginLeft:8}} variant="inherit">{`count:${props.product.count}`}</Typography>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'end', marginTop:1}}>
        <Box sx={{width:'1000%', display:'flex', justifyContent:'right'}}>
            <Button  onClick = {openConfirm} sx={{fontSize: '0.5em',height:'30px', width:'80px', marginRight:1}}variant="contained">Del from card</Button>
        </Box> 
        </Box>
    </Paper>
</Box>
}

export default ShopingCardItem;