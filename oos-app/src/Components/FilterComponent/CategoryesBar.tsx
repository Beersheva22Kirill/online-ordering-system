import { Box, Button, createTheme, useMediaQuery, useTheme } from "@mui/material"
import { Category } from "../../Model/Category"
import { useState } from "react"
import CategoryElement from "./CategoryElement"

type Props = {
    categoryes:Category[]
    callback:(id:any) => void
}

const CategoryesBar:React.FC<Props> = (props) => {

    const  heandlerCategory = (id:any|undefined) => {
        props.callback(id)
    }

    const defaultTheme = createTheme();
    const theme = useTheme();
    const smallDisplay = useMediaQuery(theme.breakpoints.down('sm'));
    
    return <Box sx={{display:'flex', flexDirection:'row', width:smallDisplay ? '80vw':'70vw', overflowX:'auto', height:'10vh', alignItems:'center', justifyContent:'left'}}>
                <Button sx={{fontSize:'1.5em'}} onClick={()=>heandlerCategory(undefined)}>All</Button>
                {props.categoryes.map(item => <CategoryElement category={item} callBack={heandlerCategory}></CategoryElement> )}
            </Box>
}

export default CategoryesBar;