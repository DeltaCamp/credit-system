import React from 'react'

import { Button } from 'lib/components/form'

export function SmallButton(props) {
  let {
    backgroundClasses,
    textClasses,
    paddingClasses,
    borderClasses,
    roundedClasses,
    isOutline,
    color
  } = props

  if (!color) {
    color = 'teal'
  }
  
  if (borderClasses === undefined) {
    borderClasses = `focus:border-${color}-500 hover:border-white active:border-${color}-700`
  }

  if (textClasses === undefined) {
    textClasses = `text-xxs sm:text-xs md:text-base text-white hover:text-white`
  }

  if (paddingClasses === undefined) {
    paddingClasses = `px-3 py-1 sm:px-4 sm:py-2`
  }

  if (roundedClasses === undefined) {
    roundedClasses = 'rounded-lg'
  }

  if (backgroundClasses === undefined) {
    backgroundClasses = `bg-${color}-400 hover:bg-${color}-500 focus:bg-${color}-600 active:bg-${color}-700`
  } 

  return <Button
    isOutline={isOutline}
    backgroundClasses={backgroundClasses}
    textClasses={textClasses}
    paddingClasses={paddingClasses}
    borderClasses={borderClasses}
    roundedClasses={roundedClasses}
    {...props}
  />
}