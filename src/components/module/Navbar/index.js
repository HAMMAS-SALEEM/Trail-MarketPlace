import React from 'react'
import Logo from '../Logo'

const Navbar = () => {
  return (
    <div className='max-h-max h-full p-2 flex flex-row justify-center w-full'>
        <Logo width={300} height={100} />
    </div>
  )
}

export default Navbar