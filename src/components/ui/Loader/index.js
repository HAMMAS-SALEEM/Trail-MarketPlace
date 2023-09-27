import React from 'react'
import {BounceLoader} from 'react-spinners'

const Loader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center p-10'>
      <BounceLoader size={50} color='black'/>
    </div>
  )
}

export default Loader