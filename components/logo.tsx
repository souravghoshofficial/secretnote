import React from 'react'
import Image from 'next/image'

const Logo = ({height = 28 , width = 28}) => {
  return (
    <div>
        <Image className='hidden dark:block' width={width} height={height} src="/secretnote-dark.png" alt='SecretNote logo'/>
        <Image className='block dark:hidden' width={width} height={height} src="/secretnote-light.png" alt='SecretNote logo'/>
    </div>
  )
}

export default Logo