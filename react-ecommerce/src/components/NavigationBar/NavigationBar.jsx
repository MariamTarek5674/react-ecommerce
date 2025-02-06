import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { changeCartStatus, selectIsCartEmpty } from '../../lib/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function NavigationBar() {
  const dispatch= useDispatch()
  const {cartItems} =useSelector((state)=>state.cart)
  const isCartEmpty = useSelector(selectIsCartEmpty);

  return (
    <nav className='fixed top-0 right-0 left-0 py-5 z-20 bg-white shadow-md'>
    <div className='w-[90%] mx-auto flex items-center justify-between'>
      <div>
        <Link to="/" className='text-black font-stretch-expanded font-sans font-light text-2xl cursor-pointer transition-all duration-500 ease-in-out'>S H O P</Link>
      </div>
      <div className='relative' onClick={()=>dispatch(changeCartStatus())}>
        <FontAwesomeIcon icon={faShoppingCart} className="text-black text-2xl cursor-pointer relative"/>
        { !isCartEmpty &&
          <span className='absolute -top-4 -right-5 inline-flex items-center justify-center px-2  text-sm font-semibold rounded-full text-black'>
             {cartItems.length} 
          </span> 
          }
      </div>
    </div>
  </nav>
  )
}
