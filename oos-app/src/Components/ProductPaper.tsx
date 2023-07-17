import { Box, Button, Paper, Typography } from "@mui/material";
import { Product } from "../Model/Product";
import configStore from '../Config/StoreConfig.json'
import { useSelectorUserState } from "../Redux/store";
import { UserData } from "../Model/UserData";
import {shopingCardService} from "../Config/service-config"

type Props = {
    product:Product;
}
const ProductPaper:React.FC<Props> = (props) => {

    const currentUser:UserData = useSelectorUserState()

    const handlerAddToCard = async () => {
        shopingCardService.addToCard(props.product.id,currentUser.uid)
    }

    return <Paper sx={{ display:'flex', flexDirection:'column', margin: 5, height: 340, width: 300}}>
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
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'end', marginTop:1}}>
                <Box sx={{width:'50%', display:'flex', justifyContent:'left', marginLeft:1}}>
                    <Button sx={{fontSize: '0.5em',height:'30px', width:'50px'}} variant="contained">By now</Button>
                </Box>
                <Box sx={{width:'50%', display:'flex', justifyContent:'right', marginRight:1}}>
                    <Button onClick={handlerAddToCard} sx={{fontSize: '0.5em',height:'30px', width:'50px'}}variant="contained">Add to card</Button>
                </Box>
                
            </Box>
        </Paper>
    
}

export default ProductPaper;