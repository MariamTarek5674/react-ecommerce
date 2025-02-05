import React from 'react'
import Skeleton from '../../../../../Skeleton/Skeleton'


export default function ProductCardSkeleton() {
return (
<div className="relative group flex flex-col gap-3 cursor-pointer">
    <div className="overflow-hidden h-48 md:h-70 ">
        <div className="w-full h-full">
           <Skeleton/>
        </div>
    </div>
    <div className="w-1/3 h-4">
      <Skeleton/>
    </div>
    <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="h-6 w-2/3">
          <Skeleton />
        </div>
        <div  className="h-6 w-1/3">
          <Skeleton/>
        </div>
    </div>
    <div className='w-full h-12'>
      <Skeleton />
    </div>
</div>   
  )
}
