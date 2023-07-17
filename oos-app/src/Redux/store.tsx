import { useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userStatusReducer } from "./Slices/AuthSlice";

export const store = configureStore({

    reducer: {
        userState:userStatusReducer
    }

})

export function useSelectorUserState() {
    return useSelector<any,any>(state => state.userState.userStatus)
}


