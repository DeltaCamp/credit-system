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
    `bg-black active:bg-black` :
    `bg-black hover:bg-${color}-500 active:bg-${color}-600`

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

  if (active && count) {
    if (count % 1 === 0) {
      style = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='26' height='13' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a4aff' fill-opacity='0.72'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }
    }

    if (count % 2 === 0) {
      style = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23f550fc' fill-opacity='0.28' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E")`
      }
    }

    if (count % 3 === 0) {
      style = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232ff76f' fill-opacity='0.18' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
      }
    }

    if (count % 4 === 0) {
      style = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6600' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
      }
    }
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
