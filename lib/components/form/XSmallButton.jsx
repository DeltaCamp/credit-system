import React from 'react'

import { SmallButton } from 'lib/components/form'

export function XSmallButton(props) {
  let {
    textClasses,
    paddingClasses,
    color
  } = props

  let textColor = `text-${color}-200 focus:text-${color}-200`

  if (!color) {
    textColor = 'text-white focus:text-white'
  }
  
  if (textClasses === undefined) {
    textClasses = `text-xs ${textColor} hover:text-white`
  }

  if (paddingClasses === undefined) {
    paddingClasses = `py-1 px-2`
  }

  return <SmallButton
    textClasses={textClasses}
    paddingClasses={paddingClasses}
    {...props}
  />
}