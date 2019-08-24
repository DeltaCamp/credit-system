import React from 'react'

import { Button } from 'lib/components/form/Button'

export function TabButton({
  children,
  isSmall,
  isMonotone,
  color,
  active,
  onClick,
  roundedClasses,
  paddingClasses,
  className,
  count
}) {
  let style = {}

  let textSizes = 'text-sm md:text-lg lg:text-xl'
  if (isSmall) {
    textSizes = 'text-xs sm:text-sm'
  }

  let backgroundClasses = active ?
    `bg-white active:bg-white` :
    `bg-white hover:bg-${color}-500 active:bg-${color}-600`

  let textClasses = active ?
    `${textSizes} text-${color}-100` :
    `${textSizes} text-${color}-400 hover:text-white active:text-${color}-300`

  let borderClasses = active ?
    `border-b-2 border-${color}-200 active:border-${color}-200` :
    `border-b-2 border-${color}-500 hover:border-${color}-500 active:border-${color}-600`

  if (paddingClasses === undefined) {
    paddingClasses = `px-6 sm:px-10 py-2 lg:py-3 xl:py-4`
  }

  // Smol
  if (isSmall) {
    paddingClasses = `px-4 py-1`

    textClasses = active ?
      `${textSizes} text-${color}-600` :
      `${textSizes} text-${color}-300 hover:text-white active:text-${color}-300`
  }

  // Monotone
  if (isMonotone) {
    backgroundClasses = active ?
      `bg-brand--dark active:bg-brand--dark` :
      `bg-brand hover:bg-brand--light active:bg-brand--light`

    textClasses = active ?
      `${textSizes} text-white` :
      `${textSizes} text-white hover:text-white active:text-white`

    borderClasses = active ?
      `border-b border-white active:border-white` :
      `border-b border-brand--light hover:border-white active:border-white`
  }

  return <Button
    backgroundClasses={backgroundClasses}
    borderClasses={borderClasses}
    paddingClasses={paddingClasses}
    roundedClasses={roundedClasses}
    textClasses={textClasses}
    className={className}
    onClick={onClick}
    style={style}
  >
    {children}
  </Button>
}
