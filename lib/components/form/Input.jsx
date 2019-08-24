import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash'

export function Input(props) {
  let {
    addOn,
    marginClasses,
    textClasses,
    roundedClasses,
    isError,
    isLight,
    isLeft,
    isPurple
  } = props

  const defaultClasses = 'focus:outline-none focus:outline-none leading-snug py-2 px-4 lg:py-4'

  const darkClasses = 'text-white border-0 bg-teal-600 opacity-90 hover:opacity-100 focus:opacity-100'
  
  const lightClasses = 'text-black border-2 rounded bg-gray-100 hover:bg-gray-200 border-gray-100 hover:border-gray-200 focus:border-gray-500'

  const purpleClasses = 'text-white border-0 bg-purple-600 opacity-90 hover:opacity-100 focus:opacity-100'

  if (roundedClasses === undefined) {
    roundedClasses = 'rounded'
  }

  if (marginClasses === undefined) {
    marginClasses = 'mb-4'
  }

  if (textClasses === undefined) {
    textClasses = 'text-xl sm:text-3xl'
  }


  const className = classnames(
    defaultClasses,
    marginClasses,
    textClasses,
    roundedClasses,
    props.className, {
      'text-red-500': isError,
      [darkClasses]: !isLight,
      [lightClasses]: isLight,
      [purpleClasses]: isPurple,
      'text-center': !isLeft,
      'text-left': isLeft
    }
  )

  const newProps = omit(props, [
    'addOn',
    'isPurple',
    'marginClasses',
    'roundedClasses',
    'textClasses',
    'isError',
    'isLight',
    'isLeft'
  ])

  return <>
    <input
      {...newProps}
      className={className}
    /> {addOn}
  </>
}