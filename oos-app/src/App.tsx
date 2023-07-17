import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigatorDispather from './Components/navigators/NavigatorDispather';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from './Pages/Products';
import Users from './Pages/Users';
import ShopingCard from './Pages/ShopingCard';
import Orders from './Pages/Orders';
import SignOut from './Pages/SIgnOut';
import SignIn from './Pages/SignIn';
import MyOrders from './Pages/MyOrders';
import navConfig from './Config/navConfig.json'
import storeConfig from './Config/StoreConfig.json'
import { useDispatch } from 'react-redux';
import { UserData } from './Model/UserData';
import { useSelectorUserState } from './Redux/store';
import { ItemType } from './Model/ItemType';
import { useTheme } from "@mui/material/styles"
import Stock from './Pages/Stock';

function getMenuItem(currentuser:UserData):ItemType[]{
  let res:ItemType[];
    if (currentuser.role === 'admin'){
      res = navConfig.items.filter(item => item.users.includes('admin'))
    } else if (currentuser.role === 'authorized') {
      res = navConfig.items.filter(item => item.users.includes('authorized'))
    } else {
      res = navConfig.items.filter(item => item.users.includes('unauthorized'))
    }
  return res;
}


function App() {
  const dispath = useDispatch()
  const currentUser: UserData = useSelectorUserState()
  const menuItems = useMemo(() => getMenuItem(currentUser),[currentUser])
  const theme = useTheme()
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down('md'));

  return <Box>
    <Typography variant= {isSmallDisplay ? 'h5' : 'h3'} >{storeConfig.StoreName}</Typography>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<NavigatorDispather navItem={menuItems}></NavigatorDispather>}>
        <Route path='Products' element = {<Products/>}/>
        <Route path='Stock' element = {<Stock/>}/>
        <Route path='Users' element = {<Users/>}/>
        <Route path='ShopingCard' element = {<ShopingCard/>}/>
        <Route path='MyOrders' element = {<MyOrders/>}/>
        <Route path='Orders' element = {<Orders/>}/>
        <Route path='SignIn' element = {<SignIn/>}/>
        <Route path='SignOut' element = {<SignOut/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </Box>
}

export default App;
