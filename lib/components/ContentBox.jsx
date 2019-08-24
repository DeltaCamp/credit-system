import React, { Component } from 'react'
import classnames from 'classnames'

export const ContentBox = ({ children }) => {
  return <div
    className={classnames(
      'mx-4 mt-2 mb-4 bg-white shadow text-black animated h-full text-center p-6 trans trans-fastest'
    )}
  >
    <div className='flex flex-col justify-between h-full'>
      {children}
    </div>
  </div>
}