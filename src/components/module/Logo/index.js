import React from 'react'
import Image from '../Image'
import { Link } from 'react-router-dom'

const Logo = ({width, height}) => {
  return (
    <Link to={'/'}>
        <Image
            src={`/Images/logo-light.jpeg`}
            width={width}
            height={height}
            className={`object-cover`}
            imgWrapperClass={`!max-w-[130px] md:!max-w-[150px] !w-full`}
        />
    </Link>
  )
}

export default Logo