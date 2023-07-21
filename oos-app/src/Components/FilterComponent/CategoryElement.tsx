import { Box, Typography } from "@mui/material";
import { Category } from "../../Model/Category";

type Props = {
    category:Category;
    callBack:(id:any) => void
}

const CategoryElement:React.FC<Props> = (props) => {

    const heandlerCategory = () => {
        props.callBack(props.category.id)
    }

return <Box sx={{marginLeft:2,marginRight:2}}>
            <a style={{textDecoration:'none',display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}} href="#">
                <img onClick={heandlerCategory} style={{width:'40px'}} src = {props.category.imgPath}></img>
                <Typography variant="caption">{props.category.name}</Typography>
            </a>
        </Box>

}

export default CategoryElement;