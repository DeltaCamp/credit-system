import React, { Component } from 'react'

const debug = require('debug')('pt:StatRow')

const getBackgroundColor = (color) => {
  switch (color) {
    case 'cyan':
      return '#003144'
    case 'green':
      return '#003144'
    case 'pink':
      return '#2D0037'
    case 'blue':
      return '#100636'
    case 'purple':
      return '#28034e'
    default:
      return '#1D0037'
  }
}

const getColorClass = (color) => {
  switch (color) {
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

  const style = {
    backgroundColor: getBackgroundColor(color)
  }
  
  let titleTextClass = `text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${colorClass}`,
    valueTextClass = `font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${colorClass}`

  if (unit) {
    unit = <span className='text-white text-xs'>{unit}</span>
  }

  return <div
    className='flex justify-between w-auto px-2 -mx-2'
    style={style}
  >
    <div
      className={`w-1/2 sm:w-3/5 justify-center ${titleTextClass}`}
    >
      <span className='font-condensed inline-block w-1/2 sm:w-3/5'>
        {title}
      </span>

      <span
        className={`${valueTextClass} inline-block w-1/2 sm:w-2/5 text-right`}
        style={{
          textShadow: '2px 2px 0 rgba(40, 10, 70, 0.3)'
        }}
      >
        {value} <span className='font-headline'>{unit}</span>
      </span>
    </div>
    {children}
  </div>
  
}