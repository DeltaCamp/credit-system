import React from 'react'
import { omit } from 'lodash'

import { SmallButton } from 'lib/components/form'

export function XSmallButton(props) {
  let {
    isOutline,
    textClasses,
    paddingClasses,
    color
  } = props

  let textColor = `text-white focus:text-${color}-100`

  if (!color) {
    textColor = 'text-white focus:text-white'
  }
  
  if (textClasses === undefined) {
    textClasses = `text-sm ${textColor} hover:text-white`
  }

  if (paddingClasses === undefined) {
    paddingClasses = `py-1 px-2`
  }

  const newProps = omit(props, [
    'textClasses',
    'paddingClasses',
    'color',
    'isOutline',
  ])

  return <SmallButton
    textClasses={textClasses}
    paddingClasses={paddingClasses}
    isOutline={isOutline}
    color={color}
    {...newProps}
  />
}