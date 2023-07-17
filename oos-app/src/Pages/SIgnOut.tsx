import { useDispatch } from "react-redux";

import { CSSProperties} from "react";
import {Button, Box} from "@mui/material";
import { useerStatusAction } from "../Redux/Slices/AuthSlice";
import { LOCAL_STORAGE_ITEM_USER, authService } from "../Config/service-config";

const SignOut:React.FC = () => {
   
    const dispatch = useDispatch<any>()
    const style: CSSProperties = {
        display:'flex',
        justifyContent: "center"
    }

    function callBackSignOut() {
        authService.logout();
        localStorage.removeItem(LOCAL_STORAGE_ITEM_USER);
        dispatch(useerStatusAction.reset());
       
    }
   
    return  <Box style={style}>
                <Button  onClick={callBackSignOut}>confirm sign out</Button>
            </Box>
    
}

export default SignOut;