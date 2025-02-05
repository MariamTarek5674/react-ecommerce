import React from 'react'
import RatingStar from '../RatingStar/RatingStar'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {
  return ( <>
    <div className="relative group flex flex-col gap-3" >
       <div className="overflow-hidden aspect-w-1 aspect-h-1 h-48 md:h-80 md:p-5 relative">
          <img className="w-full h-full transition-all duration-300 hover:scale-115 object-contain" src={product.image} alt={product.title} />
          <div className='absolute bottom-5 right-5'>
          <button className='w-10 h-10 flex items-center justify-center rounded-full font-semibold gap-1 border-2  border-black text-black bg-white text-2xl shadow-2xl hover:cursor-pointer hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-300'>
             +
          </button>
        </div>
       </div>
       <div className="absolute left-3 top-3">
          <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-slate-100 rounded-full">{product.category}</p>
        </div>
        <div>
          <div>
            <RatingStar productRate={product.rating.rate} />
          </div>
        <div className="flex items-start justify-between space-x-4">
          <div>
            <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base h-full">
              {product.title.length > 15 ? product.title.substring(0, 15) + '...' : product.title}
            </h3>
          </div>

        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base text-nowrap">{product.price}EGP</p>
        </div>
      </div>
     </div>
    <div>
      <Link to={`/product/${product.id}`}>
        <button className="text-lg w-full border-1 border-black font-bold whitespace-nowrap py-[.5rem] px-[1rem] transition-all duration-300  cursor-pointer hover:bg-slate-800 hover:border-slate-800 hover:text-white ">
           View Details
        </button>
      </Link>
    </div>
  </div>
    </>
   
  )
}
