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
    isLeft,
  } = props

  const defaultClasses = 'text-black border-l border-t border-r border-b-4 rounded bg-gray-100 border-gray-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:outline-none leading-snug py-2 px-4 lg:py-4'

  if (roundedClasses === undefined) {
    roundedClasses = 'rounded'
  }

  if (marginClasses === undefined) {
    marginClasses = 'mb-4'
  }

  if (textClasses === undefined) {
    textClasses = 'text-3xl'
  }


  const className = classnames(
    defaultClasses,
    marginClasses,
    textClasses,
    roundedClasses,
    props.className, {
      'text-red-500': isError,
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