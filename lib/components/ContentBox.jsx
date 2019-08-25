import React, { Component } from 'react'
import classnames from 'classnames'

export const ContentBox = ({ children, className, isTight, noGutter }) => {
  let padding = isTight ? 'px-3 pt-0 pb-3' : 'p-6'
  let margin = 'mx-4 mt-2 mb-4'
  
  if (noGutter) {
    margin = 'mb-4'
    padding = 'px-3 pt-0 pb-4'
  }

  return <div
    className={classnames(
      className || '',
      padding,
      margin,
      `bg-white rounded shadow-mixed text-black animated h-full text-center trans trans-fastest`
    )}
  >
    <div className='flex flex-col justify-between h-full'>
      {children}
    </div>
  </div>
}