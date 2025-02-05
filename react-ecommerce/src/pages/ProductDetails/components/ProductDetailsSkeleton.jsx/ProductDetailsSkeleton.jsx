import React from 'react'
import Skeleton from '../../../../components/Skeleton/Skeleton';

export default function ProductDetailsSkeleton() {
  return (
    <div className="px-6 md:px-28 py-40 flex flex-col items-center justify-center">
     <div className="w-full flex gap-6 h-full">
        <div className="w-1/3 h-80">
          <Skeleton/>
        </div>
       <div className="w-2/3 p-6 flex flex-col gap-4">
          <div className="h-8 w-1/2">
            <Skeleton />
          </div>
          <div className="h-28 w-full">
            <Skeleton />
          </div>
          <div className="h-4 w-1/4">
            <Skeleton />
          </div>
          <div className="h-6 w-1/4">
            <Skeleton />
          </div>
          <div className="h-12 w-full">
            <Skeleton />
          </div>
       </div>
    </div>
   </div>
  )
}
