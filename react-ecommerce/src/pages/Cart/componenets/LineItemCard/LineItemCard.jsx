import React from 'react'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../../../../lib/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function LineItemCard({product}) {
    const dispatch= useDispatch()
  return (
    <>
    <div v-if="!loading" className="flex justify-between h-[100px] ">
         <div className="flex w-1/4 h-full gap-2">
            <img className="w-2/3 h-full object-contain" src={product.image} alt="" />
            <div className="w-1/3 flex flex-col justify-center items-start whitespace-nowrap">
                <div className="text-left product-title">
                        {product.title.length>18? product.title.substring(0,18)+"..." :product.title}
                </div>
                <div className="font-bold text-lg p-2 product-price">{product.price} EGP</div> 
             </div>
        </div>
        <div className='w-1/4 pt-2 flex justify-between items-center'>
            <button className='w-[25px] h-[25px] border-black border-2 font-bold cursor-pointer flex items-center  justify-center p-0 m-0'
              onClick={()=>dispatch(updateQuantity({id:product.id, newQuantity: product.quantity - 1}))} >
                {
                   product.quantity == 1 ? <FontAwesomeIcon icon={faTrashAlt} className='text-xs text-red-700'/> : '-'
                }
            </button>
            <span className="font-bold text-black">{product.quantity}</span>
            <button className="w-[25px] h-[25px] border-black border-2 font-bold cursor-pointer flex items-center  justify-center p-0 m-0 "
              onClick={()=>dispatch(updateQuantity({id:product.id, newQuantity: product.quantity + 1}))}>
                +
            </button>
        </div>
    </div>
    </>
  )
}
