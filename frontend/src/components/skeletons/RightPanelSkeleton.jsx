import React from 'react'

const RightPanelSkeleton = () => {
  return (
    <div className='flex items-center gap-2'>
        <div className='skeleton rounded-full w-6 h-6'></div>
        <div className='flex-col space-y-1 flex-1'>
            <div className='skeleton h-3 w-28 rounded-full'></div>
            <div className='skeleton h-3 w-10 rounded-full'></div>
        </div>
        <div className='skeleton h-6 w-8 rounded-full'></div>
    </div>
  )
}

export default RightPanelSkeleton