import React, { Component } from 'react'
import classnames from 'classnames'

export const ContentBox = ({ children, isTight }) => {
  const padding = isTight ? 'p-3 pb-3' : 'p-6'

  return <div
    className={classnames(
      `mx-4 mt-2 mb-4 bg-white rounded shadow-mixed text-black animated h-full text-center ${padding} trans trans-fastest`
    )}
  >
    <div className='flex flex-col justify-between h-full'>
      {children}
    </div>
  </div>
}