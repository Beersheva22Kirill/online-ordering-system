import { Grid } from "@mui/material"
import { Product } from "../Model/Product"
import ProductPaper from "./ProductPaper"


type Props = {
    products: Product[]
}

const ProductList:React.FC<Props> = (props) => {

    return <Grid container justifyContent="center" sx={{marginTop: '1vh',display:"flex",alignItems:'baseline', height:'65vh', overflowY: 'auto'}}>
                {props.products.map((item => <Grid key={item.id} item xs = {12} sm = {6} md = {3}><ProductPaper product={item}></ProductPaper></Grid>))}
             </Grid>
}

export default ProductList;