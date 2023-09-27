import React from 'react'
import {BounceLoader} from 'react-spinners'

export const Button = ({
    title,
    loading,
    loadTitle,
    className,
    type,
    onClick
}) => {
  return (
    <button type={type} onClick={onClick} className={`${className} flex flex-row items-center justify-center p-3 gap-1 bg-black text-white rounded text-sm capitalize font-bold`} disabled={loading}>
        {loading && <BounceLoader loading={loading} color='white' size={20}/>}
        {loading ? loadTitle : title}
    </button>
  )
}
