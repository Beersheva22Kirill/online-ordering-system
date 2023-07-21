import { Box, Grid, Typography } from "@mui/material"
import { Product } from "../Model/Product"
import { DataGrid } from "@mui/x-data-grid"
import ShopingCardItem from "./ShopingCardItem"
import storeConfig from '../Config/StoreConfig.json'

type Props = {
    products:Product[],
    totalSum:number,
    callBackDelItem:(id:any,count:number) => void
}

const ShopingCardList:React.FC<Props> = (props) => {




    return <Box>
                <Grid container justifyContent="center" sx={{marginTop: '2vh',display:"flex",alignItems:'baseline', height:'60vh', overflowY: 'auto'}}>
                    {props.products.map(item => <Grid key={item.id} item xs = {12} sm = {6} md = {3}><ShopingCardItem callBackDel={props.callBackDelItem} product={item}></ShopingCardItem></Grid>)}
        
                </Grid>
                <Typography>{`Total sum ${props.totalSum}${storeConfig.currencyOfPrice}`}</Typography>
        </Box>
}

export default ShopingCardList;