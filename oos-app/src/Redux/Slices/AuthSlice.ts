import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../Model/UserData";
import { LOCAL_STORAGE_ITEM_USER } from "../../Config/service-config";

const localUser:string|null = localStorage.getItem(LOCAL_STORAGE_ITEM_USER);
const currentUser:UserData = localUser ? JSON.parse(localUser) : {email:"unauthorized",role:"unauthorized",uid:''};

const initialState: {userStatus:UserData} = {

    userStatus: currentUser

}

const slice = createSlice({
    initialState,
    name:'userStatusState',
    reducers: {
        setStatus: (state,data) => {
            state.userStatus = data.payload as UserData
        },
        reset: (state) => {
            state.userStatus = {email:'unauthorized', role:'unauthorized', uid:''}
        }
    }
})

export const userStatusReducer = slice.reducer;
export const useerStatusAction = slice.actions;