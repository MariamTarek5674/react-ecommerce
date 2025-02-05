import React from 'react'
import ProductCardSkeleton from '../ProductCard/components/ProductCardSkeleton/ProductCardSkeleton'
import Skeleton from '../../../Skeleton/Skeleton'

export default function ProductsLoadingSkeleton() {
  return (
    <div className='flex flex-col gap-4 py-10'>
      <div className='flex justify-end'>
        <div className='w-40 h-10'>
          <Skeleton/>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-10 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
           [...Array(8)].map((_,index)=> <ProductCardSkeleton key={index} />)
        }
     </div>
    </div>
  )
}
