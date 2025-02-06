import { useDispatch, useSelector } from 'react-redux'
import LineItemCard from './componenets/LineItemCard/LineItemCard'
import { faTimes, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeCartStatus, clearCart, selectCartTotal, selectIsCartEmpty } from '../../lib/cartSlice'

export default function Cart() {
  const dispatch= useDispatch()
  const {cartItems} = useSelector((state)=>(state.cart))
  const isCartEmpty = useSelector(selectIsCartEmpty);
  const cartTotal= useSelector(selectCartTotal)

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-[rgba(241,245,249,0.5)]" onClick={()=>dispatch(changeCartStatus())}>
     <div>
      <div className="flex flex-col gap-2 w-full md:w-2/5 px-3 overflow-auto fixed top-0 bottom-0 right-0 z-30 bg-white py-6" onClick={(e)=>e.stopPropagation()}>
        <div className="flex px-4 justify-between items-center">
            <FontAwesomeIcon icon={faTimes} className="text-2xl font-extrabold cursor-pointer text-black" onClick={()=>dispatch(changeCartStatus())} />
            <h1 className="text-2xl font-semibold">
                My Cart
            </h1>
        </div>
        <div className="flex px-4 pt-4 !justify-end items-center">
                <button className={`flex gap-2 items-center text-sm border-2 border-black font-semibold rounded-full whitespace-nowrap py-[.5rem] px-[1rem] ${!isCartEmpty? 'hover:bg-red-600 cursor-pointer hover:text-white hover:border-red-600' : 'cursor-not-allowed'} group transition-all duration-200`}
                  disabled={isCartEmpty}
                  onClick={()=>dispatch(clearCart())}>
                    Clear
                    <FontAwesomeIcon icon={faTrashAlt} className={`text-red-700 text-sm ${!isCartEmpty && 'group-hover:text-white'}`}/>
                </button>
         </div>
        { !isCartEmpty ?
           <>
             <div className="flex flex-col gap-3 px-5 py-2" >
                { cartItems?.map((product)=> <LineItemCard product={product} key={product.id} />)}
             </div>
             <button className="min-w-[90%] cursor-pointer w-auto mx-auto text-xl border-2 border-black whitespace-nowrap py-[.5rem] px-[1rem] font-bold hover:text-white hover:bg-black transition-all duration-500">
                 PAY {cartTotal} EGP
             </button>
           </> :
           <h1 className="font-bold text-4xl text-red-800 py-20 text-center">Empty Cart</h1>
        }
        <div>
        </div>
       </div>
      </div>
      
    </section>
    
  )
}
