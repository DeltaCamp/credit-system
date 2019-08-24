import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash'

export function Form(props) {
  const {
    isError,
    isLight
  } = props

  const defaultClasses = 'flex flex-col focus:outline-none focus:outline-none mb-0 items-center'
  // const defaultClasses = ''

  const className = classnames(
    defaultClasses,
    props.className, {
      'text-red-500': isError,
      'text-black border-2 bg-gray-100 border-gray-100 hover:border-gray-200 focus:border-gray-500': isLight
    }
  )

  const newProps = omit(props, ['isError'])

  return (
    <form
      {...newProps}
      className={className}
    >
      {props.children}
    </form>
  )
}