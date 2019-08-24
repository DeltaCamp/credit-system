import React, { Component } from 'react'

const debug = require('debug')('pt:TableCol')

export const TableCol = ({
  align,
  children
}) => {
  let alignClass = 'text-left'

  if (align === 'center') {
    alignClass = 'text-center'
  } else if (align === 'right') {
    alignClass = 'text-right'
  }

  return <div
    className={`${alignClass} inline-block w-1/2`}
  >
    {children}
  </div>
}