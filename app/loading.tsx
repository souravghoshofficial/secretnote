import React from 'react'
import Loader from '@/components/loader'

const loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex items-center gap-1'>
          <Loader />
          Loading...
      </div>
    </div>
  )
}

export default loading