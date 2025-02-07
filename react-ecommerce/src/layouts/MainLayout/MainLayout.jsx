import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Cart from "../../pages/Cart/Cart";
import { getUser } from "../../lib/authSlice";
import { useDispatch, useSelector } from 'react-redux'

export default function MainLayout() {
  const {isCartOpen}= useSelector((state)=>state.cart)
  const {isAuthanticated}= useSelector((state)=>state.auth)

  const dispatch = useDispatch();

  useEffect(() => {  
    if(isAuthanticated)  
       dispatch(getUser());
}, []);

  return (
    <>
      <NavigationBar />
      <div className=" mx-auto py-16 px-10 md:px-16 mt-10 md:py-10 ">
        <Outlet />
      </div>
      { isCartOpen? <Cart/> : '' }
    </>
  )
}



