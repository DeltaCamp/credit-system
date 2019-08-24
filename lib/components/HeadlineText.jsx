import React from 'react'
import classnames from 'classnames'

const getSizeClasses = (size) => {
  switch (size) {
    case 'sm':
      return 'text-sm sm:text-base xl:text-lg'
    default:
      return 'text-base md:text-lg xl:text-2xl'
  }
}

const getAlignmentClass = (align) => {
  switch (align) {
    case 'right':
      return 'text-right'
    case 'center':
      return 'text-center'
    default:
      return 'text-left'
  }
}

export const HeadlineText = ({
  align,
  children,
  color,
  className,
  size
}) => {
  const sizeClasses = getSizeClasses(size)
  const alignmentClass = getAlignmentClass(align)

  if (!color) {
    color = 'purple'
  } else if (color !== 'white' && color !== 'black') {
    color += '-400'
  }

  return <span
    className={classnames(
      sizeClasses,
      alignmentClass,
      className,
      `text-${color}`,
      'block animated-text font-headline font-normal my-0 leading-none'
    )}
    style={{
      textShadow: '1px 1px 0 rgba(80, 10, 70, 0.2)'
    }}
  >
    {children}
  </span>
}