import { Box, Button, Paper, Typography } from "@mui/material";
import { Product } from "../Model/Product";
import configStore from '../Config/StoreConfig.json'
import { useSelectorUserState } from "../Redux/store";
import { UserData } from "../Model/UserData";
import {shopingCardService,stockService} from "../Config/service-config"
import { useRef } from "react";

type Props = {
    product:Product;
}
const ProductPaper:React.FC<Props> = (props) => {

    const currentUser:UserData = useSelectorUserState()
    const refCount = useRef<HTMLInputElement>(null)

    const handlerChange = () => {
        let inputCount = refCount.current!.value;
        const intCount = inputCount ? Number.parseInt(inputCount) : 0;
        if(intCount < 0 || intCount > props.product.count){
            alert('error count') //FEXME
            refCount.current!.value = '1'
        }
    }

    const handlerAddToCard = async () => {
        const inputCount = refCount.current!.value;
        const intCount = inputCount ? Number.parseInt(inputCount) : 0;
        if (intCount > 0 && intCount <= props.product.count){
            const newCount = props.product.count - intCount;
            stockService.updateProduct({...props.product,count:newCount},props.product.id)
            shopingCardService.addToCard(props.product.id,intCount,currentUser.uid)
        }
        
    }

    return <Paper sx={{ display:'flex', flexDirection:'column', height: 340, width: 300, marginTop:5}}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant="h6">{props.product.name}</Typography>
            </Box>
            
            <Box sx={{width:'100%', height:'65%', backgroundColor:'lightgreen'}}>
                <img style={{width:'100%', height:'100%'}} src={props.product.imagePath} alt="" />
            </Box>
            <Box>
                <Typography style={{marginLeft:8}} variant="inherit">{`price:${props.product.price}${configStore.currencyOfPrice}`}</Typography>
                <Typography style={{marginLeft:8}} variant="inherit">{`in stock:${props.product.count}`}</Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'right', alignItems:'end', marginTop:1}}>
            {currentUser.role != 'admin' && currentUser.role != 'unauthorized' 
            && <Box sx={{width:'50%', display:'flex', justifyContent:'right', marginRight:1}}>
                    <label style={{marginRight:5}} htmlFor = "count">Count</label>
                    <input onChange={handlerChange} style={{marginRight:5}} ref={refCount} defaultValue = {1} id = {`input-count-id-${props.product.id}`} name="countProduct" type="number" min={1} max={props.product.count}></input>
                    <Button onClick={handlerAddToCard} sx={{fontSize: '0.5em',height:'30px', width:'50px'}}variant="contained">Add to card</Button>
                </Box>}
                
            </Box>
        </Paper>
    
}

export default ProductPaper;