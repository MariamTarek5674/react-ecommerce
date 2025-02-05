import React from 'react'
import emptyStateImage from '../../../../assets/vegetable.png'
export default function EmptyState() {
  return (
    <div className='flex flex-col min-h-[50vh] w-full items-center justify-center gap-4'>
        <div className='h-20 w-20'>
            <img src={emptyStateImage} alt="empty state image" />
        </div>
        <div className='text-gray-800 text-4xl font-sans font-bold font-stretch-expanded text-center'>
            No Products Found
        </div>
    </div>
  )
}
