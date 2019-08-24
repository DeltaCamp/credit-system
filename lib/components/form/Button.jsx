import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash'

export function Button(props) {
  let {
    backgroundClasses,
    borderClasses,
    transitionClasses,
    textClasses,
    paddingClasses,
    roundedClasses,
    className,
    color,
  } = props

  if (!color) {
    color = 'purple'
  }

  const {
    isError,
    isText
  } = props

  let defaultClasses = 'flex-0 font-bold leading-snug tracking-wide flex-shrink-0 cursor-pointer outline-none focus:outline-none active:outline-none'

  if (transitionClasses === undefined) {
    transitionClasses = 'trans trans-fast'
  }
  
  if (isText) {
    backgroundClasses = 'bg-transparent hover:bg-transparent'
    borderClasses = 'border-transparent'
    className += ' min-width-auto opacity-70 hover:opacity-100'

    if (!paddingClasses) {
      paddingClasses = 'px-2 py-1'
    }
  } else {
    defaultClasses += ' font-bold'
  }

  if (borderClasses === undefined) {
    borderClasses = `border-b-2 border-${color}-200 hover:border-white active:border-transparent`
  }

  if (textClasses === undefined) {
    textClasses = 'text-lg lg:text-xl text-white'
  }

  if (paddingClasses === undefined) {
    paddingClasses = 'px-6 py-4'
  }

  if (roundedClasses === undefined) {
    roundedClasses = 'rounded-lg'
  }

  if (backgroundClasses === undefined) {
    backgroundClasses = `bg-${color}-500 hover:bg-${color}-300 active:bg-${color}-600`
  } 
  
  if (isError) {
    backgroundClasses = 'bg-red-500 hover:bg-red-500 active:bg-red-600'
  }

  className = classnames(
    defaultClasses, 
    transitionClasses,
    backgroundClasses,
    textClasses,
    paddingClasses,
    borderClasses,
    roundedClasses,
    className
  )

  const newProps = omit(props, [
    'transitionClasses',
    'borderClasses',
    'paddingClasses', 
    'backgroundClasses', 
    'textClasses', 
    'borderClasses',
    'roundedClasses',
    'isError',
    'isText'
  ])

  return (
    <button
      {...newProps}
      className={className}
    />
  )
}