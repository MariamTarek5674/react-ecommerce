import {useMemo,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { addToCart, updateQuantity } from '../../../../../../lib/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function AddToCart({product}) {
  const dispatch = useDispatch()
  const {cartItems} = useSelector((state)=>state.cart)
  const [showControls, setShowControls] = useState(false);
  const {isAuthanticated} = useSelector((state)=> state.auth)
  const navigate = useNavigate();
  
  const cartItem = useMemo(() => cartItems.find((item) => item.id === product.id), [cartItems, product.id]);
  const isInCart = !!cartItem;
  const quantityInCart = cartItem?.quantity || 0;

  function handleUpdateQuantity(updateFlag){
    if(updateFlag=='+'){
      dispatch(updateQuantity({id:product.id, newQuantity:quantityInCart+1}))
    }else{
      dispatch(updateQuantity({id:product.id, newQuantity:quantityInCart-1}))
    }
  }

  function handleAddToCart(){
    if(isAuthanticated){
      dispatch(addToCart(product))
    }else{
      navigate('/login')
    }
  }

  return (
    <div className='absolute bottom-5 right-5 transition-all duration-500' onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
          {
            isInCart && showControls? 
            <div className='flex flex-col gap-2 items-center'>
                <button className='w-10 h-10 flex items-center justify-center rounded-full font-semibold gap-1 border-2  border-black text-black bg-white text-2xl shadow-2xl hover:cursor-pointer hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-300'
                  onClick={() => handleUpdateQuantity("-")}>
                  {quantityInCart == 1 ? <FontAwesomeIcon icon={faTrashAlt} className='text-sm'/> : '-' }
               </button>
               <span className='bg-white px-2 border border-black'>{ quantityInCart }</span>
               <button className='w-10 h-10 flex items-center justify-center rounded-full font-semibold gap-1 border-2  border-black text-black bg-white text-2xl shadow-2xl hover:cursor-pointer hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-300'
                 onClick={() => handleUpdateQuantity('+')}>
                  +
               </button>
            </div>
            : 
            <button className='w-10 h-10 flex items-center justify-center rounded-full font-semibold gap-1 border-2  border-black text-black bg-white text-2xl shadow-2xl hover:cursor-pointer hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-300'
                onClick={() => handleAddToCart()}>
                  {
                    isInCart? <span className='text-sm'>x{quantityInCart}</span> :
                    '+'
                  }
             </button>
          }
      </div>
  )
}
