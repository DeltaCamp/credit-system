import React, { Component } from 'react'

const debug = require('debug')('pt:StatRow')

const getColorClass = (color) => {
  switch (color) {
    case 'black':
      return 'text-black'
    case 'cyan':
      return 'text-cyan-400'
    case 'green':
      return 'text-green-400'
    case 'pink':
      return 'text-pink-400'
    case 'blue':
      return 'text-blue-400'
    case 'purple':
      return 'text-purple-400'
    default:
      return 'text-white'
  }
}

export const StatRow = ({
  children,
  color,
  title,
  value,
  unit
}) => {
  const colorClass = getColorClass(color)
  
  let titleTextClass = `text-lg xl:text-xl ${colorClass}`,
    valueTextClass = `font-bold text-lg xl:text-xl ${colorClass}`

  if (unit) {
    unit = <span className='text-white text-xs'>{unit}</span>
  }

  return <div
    className='flex justify-between w-auto px-2'
  >
    <div
      className={`justify-center w-full ${titleTextClass}`}
    >
      <span className='text-left inline-block w-3/5'>
        {title}
      </span>

      <span
        className={`${valueTextClass} inline-block w-2/5 text-right`}
      >
        {value} <span className='font-headline'>{unit}</span>
      </span>
    </div>
    {children}
  </div>
  
}