import React from 'react'
import classnames from 'classnames'

export const LoadingSpinner = ({ ready }) => (
  <div
    className={classnames('loading-indicator', { 'fade-exit': ready })}
  >
    <div
      width='100'
      className='mx-auto loader'
    />
  </div>
)