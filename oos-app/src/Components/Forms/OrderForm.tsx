import { Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material";
import { Product } from "../../Model/Product"
import { UserData } from "../../Model/UserData";
import { OrderData } from "../../Model/OrderData";
import PreOrderGrid from "../Grids/PreOrderGrid";
import storeConfig from '../../Config/StoreConfig.json'

type Props = {
    totalSum:number,
    orderProducts:Product[];
    user:UserData;
    callbackOrder:(products:Product[], orderData:OrderData) => Promise<void>

}

const OrderForm:React.FC<Props> = (props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const orderProducts:Product[] = props.orderProducts.map(item => {
            item.status = 'ordered'
            return item
        })
        const orderData:OrderData = {
            email:props.user.email,
            delivetyAdress: `${formData.get('Adress')}`,
            phone: `${formData.get('Phone')}`
        }
        props.callbackOrder(orderProducts,orderData)
        
    }

    const defaultTheme = createTheme();
      
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

    return <ThemeProvider theme={defaultTheme}>
                  
                    <CssBaseline />
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                            <Box component="form" onSubmit={handleSubmit} sx={{width:'90%',mt: 1, display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <Box sx={{width:'100%'}}>
                                    <PreOrderGrid orderProduct={props.orderProducts}></PreOrderGrid>
                                </Box>
                                <Box>
                                    <Box sx={{}}>
                                        <TextField sx={{width: '300px', margin:2}} 
                                            name = "Phone" 
                                            id="filled-basic" 
                                            label="Phone number" 
                                            variant="filled" required/>

                                        <TextField sx={{width: '300px', margin:2}} 
                                            name = "Adress" 
                                            id="filled-basic" 
                                            label="Delivery adress" 
                                            variant="filled" required/>
                                    </Box>
                                    <Box>
                                        <Typography variant="h5">Total order sum:{props.totalSum + storeConfig.currencyOfPrice}</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button sx ={{marginTop:2}} type = "submit" variant="contained">Submit</Button>
                                </Box>
                               
                            </Box>
                    </Box>
            </ThemeProvider>
 
}

export default OrderForm;