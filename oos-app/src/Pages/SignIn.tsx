import { Typography } from "@mui/material"
import SignInForm from "../Components/Forms/SignInForm";
import { LoginData } from "../Model/LoginData";
import { LOCAL_STORAGE_ITEM_USER, authService } from "../Config/service-config";
import { useDispatch } from "react-redux";
import { useerStatusAction, userStatusReducer } from "../Redux/Slices/AuthSlice";
import { log } from "console";


const SignIn:React.FC = () => {
    const dispathe = useDispatch()

    async function callbackSignIn(loginData:LoginData){
       try {
         const currentUser = await authService.login(loginData)
         if (currentUser) {
            localStorage.setItem(LOCAL_STORAGE_ITEM_USER,JSON.stringify(currentUser));
            dispathe(useerStatusAction.setStatus(currentUser))
         }
       } catch (error) {
            console.log(error);
            
       }
    }

    return <SignInForm callbackFn={callbackSignIn}></SignInForm>
}

export default SignIn;