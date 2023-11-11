import React from 'react'
import { Oval, ThreeCircles } from 'react-loader-spinner'

export const Loading = ({status}) => {
  return (
    <div className="main-page-loader">
      <Oval
        height={80}
        width={80}
        color="#1CABD8"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="white"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  )
}
